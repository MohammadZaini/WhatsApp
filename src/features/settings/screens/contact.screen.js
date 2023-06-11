import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { PageContainer } from "../../../components/utils/page-container";
import { ProfileImage } from "../../../components/profile-image.component";
import styled from "styled-components";
import { PageTitle } from "../components/page-title.component";
import { colors } from "../../../infrastructure/theme/colors";
import { getUserChats } from "../../../components/utils/actions/user-actions";
import { DataItem } from "../../chats/components/data-item.component";

const ContactScreen = props => {
    const currentUserId = props.route?.params?.uid;
    const storedUsers = useSelector(state => state.users.storedUsers);
    const storedChats = useSelector(state => state.chats.chatsData); // An object of stored chats. ex, {id: { createdAt: ..., latestMessageText: ... }}
    const currentUser = storedUsers[currentUserId]

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

        </TopContainer>
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