import React, { useEffect, useRef } from "react";
import CustomHeaderButton from "../../../components/custom-header-button.component";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { PageContainer } from "../../../components/utils/page-container";
import { colors } from "../../../infrastructure/theme/colors";
import { FontAwesome } from '@expo/vector-icons';
import { SearchBarContainer, SearchInput, UsersContainer, DefaultText, LoadingContainer, ChatNameContainer, AddParticipantsContainer, AddParticipantsInput } from "../components/new-chat.styles";
import { useState } from "react";
import { searchUsers } from "../../../components/utils/actions/user-actions";
import { ActivityIndicator } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
import { DataItem } from "../components/data-item.component";
import { useSelector, useDispatch } from "react-redux";
import { setStoredUsers } from "../../../../store/user-slice";
import { ProfileImage } from "../../../components/profile-image.component";

const NewChatScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState();
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchTerm, setSeachTerm] = useState('');
    const [chatName, setChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers)

    const selectedUsersFlatlist = useRef();

    const chatId = props.route.params && props.route.params.chatId
    const existingUsers = props.route.params && props.route.params.existingUsers;
    const isGroupChat = props.route.params && props.route.params.isGroupChat;
    const isGroupChatDisabled = selectedUsers.length === 0 || (isNewChat && chatName === "");

    const isNewChat = !chatId;

    useEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Close"
                        onPress={() => props.navigation.goBack()} />
                </HeaderButtons>
            },

            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    {
                        isGroupChat &&
                        <Item
                            title={isNewChat ? "Create" : "Add"}
                            disabled={isGroupChatDisabled}
                            color={isGroupChatDisabled ? colors.lightGrey : undefined}
                            onPress={() => {
                                const screenName = isNewChat ? "ChatList" : "ChatsSettings"
                                props.navigation.navigate(screenName,
                                    {
                                        selectedUsers,
                                        chatName,
                                        chatId
                                    })
                            }
                            } />
                    }

                </HeaderButtons>
            },
            headerTitle: isGroupChat ? "Add participants" : "New chat"
        })
    }, [chatName, selectedUsers]);

    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            if (!searchTerm || searchTerm === "") {
                setUsers()
                setNoResultsFound(false);
                return;
            };

            setIsLoading(true);

            const usersResult = await searchUsers(searchTerm);
            delete usersResult[userData.userId];

            setUsers(usersResult);

            if (Object.keys(usersResult).length === 0) {
                setNoResultsFound(true);
            } else {
                setNoResultsFound(false);

                dispatch(setStoredUsers({ newUsers: usersResult }));
            };

            setIsLoading(false);

        }, 500);

        return () => clearTimeout(delaySearch)
    }, [searchTerm]);

    const userPressed = userId => {

        if (isGroupChat) {
            const newSelectedUsers = selectedUsers.includes(userId) ?
                selectedUsers.filter(id => id !== userId) :
                selectedUsers.concat(userId);

            setSelectedUsers(newSelectedUsers);
        }
        else {
            props.navigation.navigate("ChatList", {
                selectedUserId: userId
            })
        }
    };

    return (
        <PageContainer>

            {
                isNewChat && isGroupChat &&
                <ChatNameContainer>
                    <AddParticipantsContainer>
                        <AddParticipantsInput
                            placeholder="Enter a name for your chat"
                            autoCorrect={false}
                            autoComplete={'off'}
                            value={chatName}
                            onChangeText={setChatName}
                        />
                    </AddParticipantsContainer>
                </ChatNameContainer>
            }

            {
                isGroupChat &&
                <View style={styles.selectedUsersContainer}>
                    <FlatList
                        data={selectedUsers}
                        style={styles.selectedUsersList}
                        horizontal
                        keyExtractor={item => item}
                        contentContainerStyle={{ alignItems: 'center' }}
                        ref={ref => selectedUsersFlatlist.current = ref}
                        onContentSizeChange={() => selectedUsers.length > 0 && selectedUsersFlatlist.current.scrollToEnd()}
                        renderItem={(itemData) => {
                            const userId = itemData.item;
                            const userData = storedUsers[userId];
                            return <ProfileImage
                                style={styles.selectedUsersStyle}
                                size={40}
                                uri={userData.profilePicture}
                                onPress={() => userPressed(userId)}
                                showRemoveButton={true}
                            />
                        }}
                    />
                </View>
            }

            <SearchBarContainer>
                <FontAwesome name="search" size={15} color={colors.lightGrey} />
                <SearchInput onChangeText={setSeachTerm} />
            </SearchBarContainer>

            {
                isLoading &&
                <LoadingContainer>
                    <ActivityIndicator size="large" color={colors.primary} />
                </LoadingContainer>

            }

            {
                !isLoading && !noResultsFound && users &&
                <FlatList
                    data={Object.keys(users)}
                    renderItem={(itemData) => {
                        const userId = itemData.item;
                        const userData = users[userId];

                        if (existingUsers && existingUsers.includes(userId)) {
                            return;
                        }
                        return (
                            <DataItem
                                title={`${userData.firstName} ${userData.lastName}`}
                                subTitle={userData.about}
                                image={userData.profilePicture}
                                onPress={() => userPressed(userId)}
                                type={isGroupChat ? "checkbox" : ""}
                                isChecked={selectedUsers.includes(userId)}
                            />
                        )
                    }}
                />
            }

            {
                !isLoading && noResultsFound && (
                    <UsersContainer>
                        <FontAwesome name="question" size={55} color={colors.lightGrey} />
                        <DefaultText>No users found</DefaultText>

                    </UsersContainer>
                )
            }

            {
                !isLoading && !users && (
                    <UsersContainer>
                        <FontAwesome name="users" size={55} color={colors.lightGrey} />
                        <DefaultText>Enter a name to search for a user</DefaultText>
                    </UsersContainer>
                )
            }

        </PageContainer >
    );
};

const styles = StyleSheet.create({
    selectedUsersContainer: {
        height: 60,
        justifyContent: 'center'
    },
    selectedUsersList: {
        height: "100%",
        paddingTop: 10
    },
    selectedUsersStyle: {
        marginRight: 10,
        marginBottom: 10
    }
})

export default NewChatScreen;


