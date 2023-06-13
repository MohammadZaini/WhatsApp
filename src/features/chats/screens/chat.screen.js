import React, { useCallback, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatsBackground, BottomView, ChatInput, SendIcon, SendImageIcon, TakePictureIcon } from "../components/chat.styles";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PageContainer } from "../../../components/utils/page-container";
import { Bubble } from "../components/bubble.component";
import { createChat, sendImage, sendTextMessage } from "../../../components/utils/actions/chat-actions";
import { FlatList } from "react-native";
import { ReplyTo } from "../components/reply-to.component";
import { launchImagePicker, openCamera, uploadImageAsync } from "../../../components/utils/image-picker-helper";
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from "../../../infrastructure/theme/colors";
import { View, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/custom-header-button.component";

const ChatScreen = props => {
    const [chatUsers, setChatUsers] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [chatId, setChatId] = useState(props.route?.params?.chatId);
    const [errorBannerText, setErrorBannerText] = useState("");
    const [replyingTo, setReplyingTo] = useState();
    const [tempImageUri, setTempImageUri] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const flatlist = useRef();

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    const storedChats = useSelector(state => state.chats.chatsData);
    const chatMessages = useSelector(state => {
        if (!chatId) return [];

        const chatMessagesData = state.messages.messagesData[chatId];

        if (!chatMessagesData) return [];

        const messageList = [];

        for (const key in chatMessagesData) {
            const message = chatMessagesData[key]

            messageList.push({
                key,
                ...message,
            })
        }

        return messageList;
    });

    const chatData = (chatId && storedChats[chatId]) || props.route?.params?.newChatData || {};
    const chatName = props.route?.params?.chatName;

    const otherUserId = chatUsers.find(uid => uid !== userData.userId);

    const getChatTitleFromName = () => {
        const otherUserData = storedUsers[otherUserId];
        return otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`;
    };

    useEffect(() => {
        if (!chatData) return;

        props.navigation.setOptions({
            headerTitle: chatData.chatName ?? getChatTitleFromName(),
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    {
                        chatId &&
                        <Item
                            title="Chat settings"
                            iconName="settings-outline"
                            onPress={() => chatData.isGroupChat ?
                                props.navigation.navigate("ChatsSettings", { chatId }) :
                                props.navigation.navigate("Contact", { uid: otherUserId })}
                        />
                    }
                </HeaderButtons>
            }
        });

        setChatUsers(chatData.users);
    }, [chatUsers, chatData.chatName]);

    const sendMessage = useCallback(async () => {
        try {
            let id = chatId;
            if (!id) {
                //No chat Id. Create the chat
                id = await createChat(userData.userId, props.route.params.newChatData);
                setChatId(id);
            };

            await sendTextMessage(id, userData, messageText, replyingTo && replyingTo.key, chatUsers);
            setMessageText("");
            setReplyingTo(null)
        } catch (error) {
            console.log(error);
            setErrorBannerText("Message failed to send");
            setTimeout(() => setErrorBannerText(""), 5000);
        };

    }, [messageText, chatId]);

    const pickImage = useCallback(async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) return;

            setTempImageUri(tempUri)
        } catch (error) {
            console.log(error);
        };
    }, [tempImageUri]);


    const takePhoto = useCallback(async () => {
        try {
            const tempUri = await openCamera();

            if (!tempUri) return;

            setTempImageUri(tempUri)
        } catch (error) {
            console.log(error);
        };
    }, [tempImageUri]);

    const uploadImage = useCallback(async () => {
        setIsloading(true);

        try {

            let id = chatId;
            if (!id) {
                //No chat Id. Create the chat
                id = await createChat(userData.userId, props.route.params.newChatData);
                setChatId(id);
            };

            const uploadUrl = await uploadImageAsync(tempImageUri, true);
            setIsloading(false);
            await sendImage(id, userData, uploadUrl, replyingTo && replyingTo.key, chatUsers);

            setReplyingTo(null);
            setTimeout(() => setTempImageUri(""), 500);

        } catch (error) {
            console.log(error);
            setIsloading(false);
        };

    }, [isLoading, tempImageUri]);

    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }} >
            <ChatsBackground>
                <PageContainer >

                    {
                        !chatId && <Bubble text="This a new chat. Say hi!" type="system" />
                    }

                    {
                        errorBannerText !== "" && <Bubble text={errorBannerText} type="error" />
                    }

                    {
                        chatId &&
                        <FlatList
                            ref={(ref) => flatlist.current = ref}
                            onContentSizeChange={() => flatlist.current.scrollToEnd({ animated: false })}
                            onLayout={() => flatlist.current.scrollToEnd({ animated: false })}
                            showsVerticalScrollIndicator={false}
                            data={chatMessages}
                            renderItem={(itemData) => {
                                const message = itemData.item;
                                const isOwnMessage = message.sentBy === userData.userId;

                                let messageType;

                                if (message.type && message.type === "info") {
                                    messageType = "info"
                                } else if (isOwnMessage) {
                                    messageType = "myMessage";
                                } else {
                                    messageType = "theirMessage"
                                }

                                const sender = message.sentBy && storedUsers[message.sentBy];
                                const name = sender && `${sender.firstName} ${sender.lastName}`

                                return <Bubble
                                    type={messageType}
                                    text={message.text}
                                    messageId={message.key}
                                    userId={userData.userId}
                                    chatId={chatId}
                                    date={message.sentAt}
                                    name={!chatData.isGroupChat || isOwnMessage ? undefined : name}
                                    setReply={() => setReplyingTo(message)}
                                    replyingTo={message.replyTo && chatMessages.find(i => i.key === message.replyTo)}
                                    imageUrl={message.imageUrl}
                                />
                            }}
                        />
                    }

                </PageContainer>
                {
                    replyingTo &&
                    <ReplyTo
                        text={replyingTo.text}
                        user={storedUsers[replyingTo.sentBy]}
                        onCancel={() => setReplyingTo(null)}
                    />
                }
            </ChatsBackground>

            <BottomView>

                <TouchableOpacity onPress={pickImage} >
                    <SendImageIcon />
                </TouchableOpacity>

                <ChatInput value={messageText} onChangeText={setMessageText} />

                {
                    messageText &&
                    <TouchableOpacity onPress={sendMessage} >
                        <SendIcon />
                    </TouchableOpacity>
                }

                {
                    <AwesomeAlert
                        show={tempImageUri !== ""}
                        title="Send Image"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={true}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Cancel"
                        confirmText="Send Image"
                        confirmButtonColor={colors.primary}
                        cancelButtonColor={colors.red}
                        // titleStyle={}
                        onCancelPressed={() => setTempImageUri("")}
                        onConfirmPressed={uploadImage}
                        onDismiss={() => setTempImageUri("")}
                        customView={(
                            <View>
                                {
                                    isLoading &&
                                    <ActivityIndicator size="small" color={colors.primary} />
                                }

                                {
                                    !isLoading && tempImageUri !== "" &&
                                    <Image source={{ uri: tempImageUri }} style={{ height: 200, width: 200 }} />
                                }
                            </View>
                        )}
                    />
                }

                {
                    !messageText &&
                    <TouchableOpacity onPress={takePhoto} >
                        <TakePictureIcon />
                    </TouchableOpacity>
                }

            </BottomView>
        </SafeAreaView>
    );
};

export default ChatScreen;