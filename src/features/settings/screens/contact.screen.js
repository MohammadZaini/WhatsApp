import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { PageContainer } from "../../../components/utils/page-container";
import { ProfileImage } from "../../../components/profile-image.component";
import styled from "styled-components";
import { PageTitle } from "../components/page-title.component";
import { colors } from "../../../infrastructure/theme/colors";
import { getUserChats } from "../../../components/utils/actions/user-actions";
import { DataItem } from "../../chats/components/data-item.component";
import { SubmitButton } from "../../account/components/submit-button.component";
import { ActivityIndicator } from "react-native-paper";
import { removeUserFromChat } from "../../../components/utils/actions/chat-actions";

const ContactScreen = props => {
    const [isLoading, setIsloading] = useState(false);

    const currentUserId = props.route?.params?.uid;
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData)
    const storedChats = useSelector(state => state.chats.chatsData); // An object of stored chats. ex, {id: { createdAt: ..., latestMessageText: ... }}
    const currentUser = storedUsers[currentUserId];

    const chatId = props.route.params.chatId;
    const chatData = chatId && storedChats[chatId];

    const [commonChats, setCommonChats] = useState([]); // An array of chats ids

    useEffect(() => {
        const getCommonuserChats = async () => {
            const currentUserChats = await getUserChats(currentUserId);
            setCommonChats(
                Object.values(currentUserChats).filter(cid => storedChats[cid] && storedChats[cid].isGroupChat)
            );
        }
        getCommonuserChats();
    }, []);

    const removeFromChat = useCallback(async () => {
        try {
            setIsloading(true);
            // Remove user
            await removeUserFromChat(userData, currentUser, chatData);
            props.navigation.goBack();
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsloading(false);
        }
    }, [props.navigation, isLoading])


    return <PageContainer>
        <TopContainer>
            <ProfileImage
                uri={currentUser.profilePicture}
                size={80}
                style={{ marginBottom: 20 }}
            />

            <PageTitle text={`${currentUser.firstName} ${currentUser.lastName}`} />

            {
                currentUser.about &&
                <About numberOfLines={2} >{currentUser.about}</About>
            }
        </TopContainer>
        {
            commonChats.length > 0 &&
            <>
                <Text style={{ alignSelf: 'flex-start', marginVertical: 10 }} >{commonChats.length} {commonChats.length === 1 ? "Group" : "Groups"} in common</Text>

                {
                    commonChats.map(cid => {
                        const chatData = storedChats[cid]

                        return <DataItem
                            key={cid}
                            title={chatData.chatName}
                            subTitle={chatData.latestMessageText}
                            type="link"
                            onPress={() => props.navigation.push("Chat", { chatid: cid })}
                            image={chatData.chatImage}
                        />
                    })
                }
            </>
        }

        {
            chatData && chatData.isGroupChat &&
            (
                isLoading ?
                    <ActivityIndicator size="small" color={colors.primary} /> :
                    <SubmitButton
                        title="Remove from chat"
                        color={colors.red}
                        onPress={removeFromChat}
                    />
            )
        }

    </PageContainer>
};

export default ContactScreen;

const TopContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-vertical: 20px;
`;

const About = styled.Text.attrs(props => ({
    numberOfLines: props.numberOfLines,
}))`
    font-size: 16px;
    color: ${colors.grey};
    letter-spacing: 0.3px;    
`;