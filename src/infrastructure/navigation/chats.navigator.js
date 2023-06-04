import { createStackNavigator } from "@react-navigation/stack";
import ChatsScreen from "../../features/chats/screens/chats.screen";
import ChatSettingsScreen from "../../features/chats/screens/chat-settings.screen";
import NewChatScreen from "../../features/chats/screens/new-chat.screen";
import { AppNavigator } from "./app.navigator";

const ChatStack = createStackNavigator();

export const ChatsNavigator = () => {
    return (
        <ChatStack.Navigator >
            <ChatStack.Group>
                <ChatStack.Screen name="Home" component={AppNavigator} options={{ headerTitle: '', headerShown: false }} />
                <ChatStack.Screen name="Chats1" component={ChatsScreen} options={{ headerTitle: '' }} />
                <ChatStack.Screen name="ChatsSettings" component={ChatSettingsScreen} options={{ headerTitle: '' }} />
            </ChatStack.Group>
            <ChatStack.Group screenOptions={{ presentation: 'modal' }} >
                <ChatStack.Screen name="NewChat" component={NewChatScreen} options={{ headerTitle: '' }} />
            </ChatStack.Group>
        </ChatStack.Navigator>
    );
};