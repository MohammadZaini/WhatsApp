import { createStackNavigator } from "@react-navigation/stack";
import { ChatsScreen } from "../../features/chats/screens/chats.screen";
import { AppNavigator } from "./app.navigator";

const ChatStack = createStackNavigator();

export const ChatsNavigator = () => {
    return (
        <ChatStack.Navigator >
            <ChatStack.Screen name="Home" component={AppNavigator} options={{ headerTitle: '' }} />
            <ChatStack.Screen name="Chats1" component={ChatsScreen} options={{ headerTitle: '' }} />
        </ChatStack.Navigator>
    );
};