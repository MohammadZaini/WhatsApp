import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ChatsBackground, BottomView, ChatInput, SendIcon } from "../components/chat.styles";
import { colors } from "../../../infrastructure/theme/colors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PageContainer } from "../../../components/utils/page-container";
import { Bubble } from "../components/bubble.component";
import { createChat, sendTextMessage } from "../../../components/utils/actions/chat-actions";
import { FlatList } from "react-native";
import { ReplyTo } from "../components/reply-to.component";

const ChatScreen = props => {
    const [chatUsers, setChatUsers] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [chatId, setChatId] = useState(props.route?.params?.chatId);
    const [errorBannerText, setErrorBannerText] = useState("");
    const [replyingTo, setReplyingTo] = useState();

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

    const chatData = (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

    const getChatTitleFromName = () => {
        const otherUserId = chatUsers.find(uid => uid !== userData.userId);
        const otherUserData = storedUsers[otherUserId];

        return otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`;
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: getChatTitleFromName()
        });

        setChatUsers(chatData.users);
    }, [chatUsers]);

    const sendMessage = useCallback(async () => {
        try {
            let id = chatId;
            if (!id) {
                //No chat Id. Create the chat
                id = await createChat(userData.userId, props.route.params.newChatData);
                setChatId(id);
            };

            await sendTextMessage(id, userData.userId, messageText, replyingTo && replyingTo.key);
            setMessageText("");
            setReplyingTo(null)
        } catch (error) {
            console.log(error);
            setErrorBannerText("Message failed to send");
            setTimeout(() => setErrorBannerText(""), 5000);
        };

    }, [messageText, chatId]);

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
                            data={chatMessages}
                            renderItem={(itemData) => {
                                const message = itemData.item;
                                const isOwnMessage = message.sentBy === userData.userId;
                                const messageType = isOwnMessage ? "myMessage" : "theirMessage";

                                return <Bubble
                                    type={messageType}
                                    text={message.text}
                                    messageId={message.key}
                                    userId={userData.userId}
                                    chatId={chatId}
                                    date={message.sentAt}
                                    setReply={() => setReplyingTo(message)}
                                    replyingTo={message.replyTo && chatMessages.find(i => i.key === message.replyTo)}
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
                <TouchableOpacity>
                    <AntDesign name="plus" size={24} color={colors.blue} />
                </TouchableOpacity>
                <ChatInput value={messageText} onChangeText={setMessageText} />
                {messageText && <TouchableOpacity onPress={sendMessage} >
                    <SendIcon />
                </TouchableOpacity>}
                {!messageText && <TouchableOpacity>
                    <Feather name="camera" size={24} color={colors.blue} />
                </TouchableOpacity>}
            </BottomView>
        </SafeAreaView>
    );
};

export default ChatScreen;