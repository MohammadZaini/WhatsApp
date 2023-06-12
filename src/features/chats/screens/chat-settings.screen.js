import React, { useCallback, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { PageContainer } from "../../../components/utils/page-container";
import { PageTitle } from "../../settings/components/page-title.component";
import { ProfileImage } from "../../../components/profile-image.component";
import { ScrollViewContainer } from "../components/chat-settings.styles";
import { Input } from "../../account/components/input.component";
import { reducer } from "../../../components/utils/reducers/form_reducer";
import { addUsersToChats, removeUserFromChat, updateChatData } from "../../../components/utils/actions/chat-actions";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { SubmitButton } from "../../account/components/submit-button.component";
import { validateInput } from "../../../components/utils/actions/form_actions";
import { Text, View } from "react-native";
import { DataItem } from "../components/data-item.component";
import { useEffect } from "react";

const ChatSettingsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const chatId = props.route.params.chatId;
    const chatData = useSelector(state => state.chats.chatsData[chatId] || {});
    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);

    const initialState = {
        inputValues: { chatName: chatData.chatName },
        inputValidities: { chatName: undefined },
        formIsValid: false
    }

    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const selectedUsers = props.route.params && props.route.params.selectedUsers;
    useEffect(() => {
        if (!selectedUsers) return;

        const selectedUsersData = [];

        selectedUsers.forEach(uid => {
            if (uid === userData.userId) return;

            if (!storedUsers[uid]) {
                console.log("No user data found in the data store");
                return;
            };

            selectedUsersData.push(storedUsers[uid])
        });

        addUsersToChats(userData, selectedUsersData, chatData);


    }, [selectedUsers])

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue })
    }, [dispatchFormState]);

    const saveHandler = useCallback(async () => {
        const updatedValues = formState.inputValues;

        try {
            setIsLoading(true);
            await updateChatData(chatId, userData.userId, updatedValues);

            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 1500);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [formState]);

    const hasChanges = () => {
        const currentValues = formState.inputValues;
        return currentValues.chatName != chatData.chatName;
    };

    const leaveChat = useCallback(async () => {
        try {
            setIsLoading(true);
            // Remove user
            await removeUserFromChat(userData, userData, chatData);
            props.navigation.popToTop();
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [props.navigation, isLoading]);

    if (!chatData.users) return null;

    return <PageContainer>
        <PageTitle text="Chat Settings" />

        <ScrollViewContainer >

            <ProfileImage
                showEditButton={true}
                size={80}
                chatId={chatId}
                userId={userData.userId}
                uri={chatData.chatImage}
            />

            <Input
                id="chatName"
                label="Chat name"
                autoCapitalize="none"
                initialValue={chatData.chatName}
                allowEmpty={false}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["chatName"]}
            />

            <View style={{ width: "100%", marginTop: 10 }} >
                <Text style={{ marginVertical: 8, letterSpacing: 0.3, color: colors.textColor }} >{chatData.users.length} Participants</Text>
                <DataItem
                    title="Add users"
                    icon="plus"
                    type="button"
                    onPress={() => props.navigation.navigate("NewChat", { isGroupChat: true, existingUsers: chatData.users, chatId })}
                />
            </View>

            {
                chatData.users.slice(0, 4).map(uid => {
                    const currentUser = storedUsers[uid];

                    return <DataItem
                        key={uid}
                        image={currentUser.profilePicture}
                        title={`${currentUser.firstName} ${currentUser.lastName}`}
                        subTitle={currentUser.about}
                        type={uid !== userData.userId && "link"}
                        onPress={() => uid !== userData.userId && props.navigation.navigate("Contact", { uid, chatId })}
                    />
                })
            }

            {
                chatData.users.length > 3 &&
                <DataItem
                    type="link"
                    title="View all"
                    hideImage={true}
                    onPress={() => props.navigation.navigate("DataList", { title: "Participant", data: chatData.users, type: "users", chatId })}
                />
            }

            {
                showSuccessMessage &&
                <Text>Saved!</Text>
            }

            {
                isLoading ?
                    <ActivityIndicator size={'small'} color={colors.primary} /> :
                    hasChanges() && <SubmitButton
                        title="Save changes"
                        color={colors.primary}
                        onPress={saveHandler}
                        disabled={!formState.formIsValid}
                    />
            }

        </ScrollViewContainer>
        {
            <SubmitButton
                title="Leave chat"
                color={colors.red}
                onPress={leaveChat}
            />
        }

    </PageContainer>
};

export default ChatSettingsScreen;