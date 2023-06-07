import React, { useEffect } from "react";
import { Text, Button, View } from 'react-native'
import CustomHeaderButton from "../../../components/custom-header-button.component";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

export const ChatsListScreen = props => {

    const selectedUserId = props.route?.params?.selectedUserId;
    const userData = useSelector(state => state.auth.userData);
    const chatsData = useSelector(state => state.chats.chatsData)


    useEffect(() => {
        if (!selectedUserId) {
            return;
        };

        const chatUsers = [selectedUserId, userData.userId];

        const naviagtionProps = {
            newChatData: { users: chatUsers }
        };

        props.navigation.navigate("Chat", naviagtionProps);

    }, [props.route?.params]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="New chat"
                        iconName="create-outline"
                        onPress={() => { props.navigation.navigate("NewChat") }} />
                </HeaderButtons>
            }
        })
    }, []);

    return (
        <View>
            <Text >Chats List</Text>
            <Button title="Go To Chats" onPress={() => props.navigation.navigate('Chat')} />
        </View>
    );
};