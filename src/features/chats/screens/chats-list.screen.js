import React, { useEffect } from "react";
import { FlatList } from 'react-native'
import CustomHeaderButton from "../../../components/custom-header-button.component";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { DataItem } from "../components/data-item.component";
import { PageContainer } from "../../../components/utils/page-container";
import { PageTitle } from "../../settings/components/page-title.component";
import { TouchableOpacity } from "react-native";
import { NewGroupContainer, NewGroupText } from "../components/chat-list.styles";

export const ChatsListScreen = props => {

    const selectedUser = props.route?.params?.selectedUserId;
    const selectedUserList = props.route?.params?.selectedUsers;
    const chatName = props.route?.params?.chatName;

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userChats = useSelector(state => {
        const chatsData = state.chats.chatsData;
        return Object.values(chatsData).sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    });

    useEffect(() => {
        if (!selectedUser && !selectedUserList) {
            return;
        };

        let chatData;
        let naviagtionProps;

        if (selectedUser) {
            chatData = userChats.find(cd => !cd.isGroupChat && cd.users.includes(selectedUser))
        };

        if (chatData) {
            naviagtionProps = { chatId: chatData.key }
        } else {
            const chatUsers = selectedUserList || [selectedUser];

            if (!chatUsers.includes(userData.userId)) {
                chatUsers.push(userData.userId)
            }

            naviagtionProps = {
                newChatData: {
                    users: chatUsers,
                    isGroupChat: selectedUserList !== undefined,
                    // chatName
                }
            };

            if (chatName) {
                naviagtionProps.newChatData.chatName = chatName;
            };
            console.log(naviagtionProps);
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
        <PageContainer>
            <PageTitle text="Chats" />

            <NewGroupContainer>
                <TouchableOpacity onPress={() => { props.navigation.navigate("NewChat", { isGroupChat: true }) }} >
                    <NewGroupText>New group</NewGroupText>
                </TouchableOpacity>
            </NewGroupContainer>

            <FlatList
                data={userChats}
                renderItem={(itemData) => {
                    const chatData = itemData.item;
                    const chatId = chatData.key;
                    const isGroupChat = chatData.isGroupChat;

                    let title = "";
                    const subTitle = chatData.latestMessageText || "New chat";
                    let image = "";

                    if (isGroupChat) {
                        title = chatData.chatName;
                        image = chatData.chatImage;
                    } else {
                        const otherUserId = chatData.users.find(uid => uid !== userData.userId);
                        const otherUser = storedUsers[otherUserId];

                        if (!otherUser) return;

                        title = `${otherUser.firstName} ${otherUser.lastName}`;

                        image = otherUser.profilePicture;
                    }

                    return <DataItem
                        title={title}
                        subTitle={subTitle}
                        image={image}
                        onPress={() => props.navigation.navigate("Chat", { chatId })}
                    />
                }}
            />
        </PageContainer>
    )
};