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

const ChatScreen = props => {
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData);

    const [chatUsers, setChatUsers] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [chatId, setChatId] = useState(props.route?.params.chatId)

    const chatData = props.route?.params?.newChatData

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

    const sendMessage = useCallback(() => {
        setMessageText("")
    }, [messageText]);

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