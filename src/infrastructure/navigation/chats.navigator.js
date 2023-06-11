import ChatScreen from "../../features/chats/screens/chat.screen";
import ChatSettingsScreen from "../../features/chats/screens/chat-settings.screen";
import NewChatScreen from "../../features/chats/screens/new-chat.screen";
import { AppNavigator } from "./app.navigator";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { child, get, getDatabase, off, onValue, ref } from "firebase/database";
import { getFirebaseApp } from "../../components/utils/firebase-helper";
import { useDispatch } from "react-redux";
import { setChatsData } from "../../../store/chat-slice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../theme/colors";
import { setStoredUsers } from "../../../store/user-slice";
import { setChatMessages, setStarredMessages } from "../../../store/messages-slice";
import ContactScreen from "../../features/settings/screens/contact.screen";

const ChatStack = createNativeStackNavigator();

export const ChatsNavigator = () => {

    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers)

    useEffect(() => {
        console.log("Subcribing to firebsae listener");

        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userChatsRef = child(dbRef, `userChats/${userData.userId}`);
        const refs = [userChatsRef];

        onValue(userChatsRef, (querySnapshot) => {
            const chatsIdData = querySnapshot.val() || {};
            const chatIds = Object.values(chatsIdData);

            const chatsData = {};
            let chatsFoundCount = 0;

            for (let i = 0; i < chatIds.length; i++) {
                const chatId = chatIds[i];
                const chatRef = child(dbRef, `chats/${chatId}`);
                refs.push(chatRef);

                onValue(chatRef, (chatSnapshot) => {
                    chatsFoundCount++;

                    const data = chatSnapshot.val();

                    if (data) {
                        data.key = chatSnapshot.key;

                        data.users.forEach(uid => {
                            if (storedUsers[uid]) return;

                            const userRef = child(dbRef, `users/${uid}`);

                            get(userRef)
                                .then(userSnapshot => {
                                    const userSnapshotData = userSnapshot.val();
                                    dispatch(setStoredUsers({ newUsers: { userSnapshotData } }))
                                })

                            refs.push(userRef);
                        })

                        chatsData[chatSnapshot.key] = data;
                    };

                    if (chatsFoundCount >= chatIds.length) {
                        dispatch(setChatsData({ chatsData }));
                        setIsLoading(false);
                    };
                });

                const messagesRef = child(dbRef, `messages/${chatId}`);
                refs.push(messagesRef);

                onValue(messagesRef, messagesSnapshot => {
                    const messagesData = messagesSnapshot.val();
                    dispatch(setChatMessages({ chatId, messagesData }));
                });

                if (chatsFoundCount == 0) {
                    setIsLoading(false);
                }
            };
        });

        const userStarredMessagesRef = child(dbRef, `userStarredMessages/${userData.userId}`);
        refs.push(userStarredMessagesRef);
        onValue(userStarredMessagesRef, querySnapshot => {
            const starredMessages = querySnapshot.val() ?? {};
            dispatch(setStarredMessages({ starredMessages }))
        })


        return () => {
            console.log("Unsubcribing firebsae listener");
            refs.forEach(ref => off(ref));
        }
    }, []);

    if (isLoading) {
        <LoadingContainer>
            <ActivityIndicator size="large" color={colors.primary} />
        </LoadingContainer>
    };

    return (
        <ChatStack.Navigator >
            <ChatStack.Group>
                <ChatStack.Screen name="Home" component={AppNavigator} options={{ headerTitle: '', headerShown: false }} />
                <ChatStack.Screen name="Chat" component={ChatScreen} options={{ headerTitle: '' }} />
                <ChatStack.Screen name="ChatsSettings" component={ChatSettingsScreen} options={{ headerTitle: '' }} />
                <ChatStack.Screen name="Contact" component={ContactScreen} options={{ headerTitle: 'Contact info', headerBackTitle: "Back" }} />
            </ChatStack.Group>
            <ChatStack.Group screenOptions={{ presentation: 'modal' }} >
                <ChatStack.Screen name="NewChat" component={NewChatScreen} />
            </ChatStack.Group>
        </ChatStack.Navigator>
    );
};

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;