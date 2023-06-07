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

const ChatScreen = props => {
    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    const storedChats = useSelector(state => state.chats.chatsData);
    const storedChatMessages = useSelector(state => state.messages.messagesData);

    console.log(storedChatMessages);

    const [chatUsers, setChatUsers] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [chatId, setChatId] = useState(props.route?.params?.chatId)

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
            }

            await sendTextMessage(id, userData.userId, messageText);

        } catch (error) {
            console.log(error);
        };

        setMessageText("")
    }, [messageText, chatId]);

    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }} >
            <ChatsBackground>
                <PageContainer >

                    {
                        !chatId && <Bubble text="This a new chat. Say hi!" type="system" />
                    }

                </PageContainer>
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