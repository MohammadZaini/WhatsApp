import { createStackNavigator } from "@react-navigation/stack";
import { ChatsScreen } from "../../features/chats/screens/chats.screen";
import { AppNavigator } from "./app.navigator";

const ChatStack = createStackNavigator();

export const ChatsNavigator = () => {
    return (
        <ChatStack.Navigator >
            <ChatStack.Screen name="Home" component={AppNavigator} />
            <ChatStack.Screen name="Chats1" component={ChatsScreen} />
        </ChatStack.Navigator>
    )
}