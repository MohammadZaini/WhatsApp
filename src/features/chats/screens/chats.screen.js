import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ChatsBackground, BottomView, ChatInput, SendIcon } from "../components/chats.styles";
import { colors } from "../../../infrastructure/theme/colors";

export const ChatsScreen = () => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = useCallback(() => {
        setMessageText("")
    }, [messageText]);

    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }} >
            <ChatsBackground />
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