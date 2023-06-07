import ChatScreen from "../../features/chats/screens/chat.screen";
import ChatSettingsScreen from "../../features/chats/screens/chat-settings.screen";
import NewChatScreen from "../../features/chats/screens/new-chat.screen";
import { AppNavigator } from "./app.navigator";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { child, getDatabase, off, onValue, ref } from "firebase/database";
import { getFirebaseApp } from "../../components/utils/firebase-helper";
import { useDispatch } from "react-redux";
import { setChatsData } from "../../../store/chat-slice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ChatStack = createNativeStackNavigator();

export const ChatsNavigator = () => {

    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.userData);

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

                        chatsData[chatSnapshot.key] = data;
                    };

                    if (chatsFoundCount >= chatId.length) {
                        dispatch(setChatsData({ chatsData }));
                    };
                });
            }
        })

        return () => {
            console.log("Unsubcribing firebsae listener");
            refs.forEach(ref => off(ref));
        }
    }, []);

    return (
        <ChatStack.Navigator >
            <ChatStack.Group>
                <ChatStack.Screen name="Home" component={AppNavigator} options={{ headerTitle: '', headerShown: false }} />
                <ChatStack.Screen name="Chat" component={ChatScreen} options={{ headerTitle: '' }} />
                <ChatStack.Screen name="ChatsSettings" component={ChatSettingsScreen} options={{ headerTitle: '' }} />
            </ChatStack.Group>
            <ChatStack.Group screenOptions={{ presentation: 'modal' }} >
                <ChatStack.Screen name="NewChat" component={NewChatScreen} />
            </ChatStack.Group>
        </ChatStack.Navigator>
    );
};