import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { Menu, MenuTrigger, MenuOptions } from "react-native-popup-menu";
import uuid from 'react-native-uuid';
import * as Clipboard from 'expo-clipboard';
import { MenuItem } from "./menu-item.component";
import { FontAwesome } from '@expo/vector-icons';
import { starMessage } from "../../../components/utils/actions/chat-actions";
import { useSelector } from "react-redux";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Bubble = props => {

    function formatDateAmPm(dateString) {
        const date = new Date(dateString);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };

    const { text, type, messageId, chatId, userId, date, setReply, replyingTo, name, imageUrl } = props;

    const starredMessages = useSelector(state => state.messages.starredMessages[chatId] ?? {});
    const storedUsers = useSelector(state => state.users.storedUsers);

    const bubbleStyle = { ...styles.Container };
    const textStyle = { ...styles.text };
    const wrapperStyle = { ...styles.wrapperStyle }

    const menuRef = useRef(null);
    const id = useRef(uuid.v4());

    let Container = View;
    let isUserMessage = false;
    const dateString = date && formatDateAmPm(date)

    switch (type) {
        case "system":
            textStyle.color = '#65644A';
            bubbleStyle.backgroundColor = colors.beige;
            bubbleStyle.alignItems = "center";
            bubbleStyle.marginTop = 10;
            break;

        case "error":
            textStyle.color = 'white';
            bubbleStyle.backgroundColor = colors.red;
            bubbleStyle.marginTop = 10;
            break;

        case "myMessage":
            wrapperStyle.marginTop = 5
            wrapperStyle.justifyContent = 'flex-end';
            bubbleStyle.backgroundColor = '#E7FED6';
            bubbleStyle.maxWidth = '90%';
            Container = TouchableWithoutFeedback;
            isUserMessage = true;
            break;

        case "theirMessage":
            wrapperStyle.justifyContent = 'flex-start';
            bubbleStyle.maxWidth = '90%';
            Container = TouchableWithoutFeedback;
            isUserMessage = true;
            break;

        case "reply":
            bubbleStyle.backgroundColor = "#F2F2F2";
            break;

        case "info":
            bubbleStyle.backgroundColor = "white";
            bubbleStyle.alignItems = "center";
            bubbleStyle.color = colors.textColor;
            break;

        default:
            break;
    };

    const copyToClipboard = async text => {
        try {
            await Clipboard.setStringAsync(text);
        } catch (error) {
            console.log(error);
        };
    };

    const isStarred = isUserMessage && starredMessages[messageId] !== undefined;
    const replyingToUser = replyingTo && storedUsers[replyingTo.sentBy];

    return (
        <View style={wrapperStyle}>
            <Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{ width: '100%' }} >
                <View style={bubbleStyle}>

                    {
                        name && type !== "info" &&
                        <Text style={{ fontWeight: 'bold' }} >{name}</Text>
                    }

                    {
                        replyingToUser &&
                        <Bubble
                            type="reply"
                            text={replyingTo.text}
                            name={`${replyingToUser.firstName} ${replyingToUser.lastName}`}
                        />
                    }

                    {
                        !imageUrl &&
                        <Text style={textStyle}>{text}</Text>
                    }

                    {
                        imageUrl &&
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    }

                    {
                        dateString && type !== "info" && <View style={styles.timeContainer} >
                            {isStarred && <FontAwesome name="star" size={15} color="yellow" style={{ marginRight: 5 }} />}
                            <Text style={styles.time} >{dateString}</Text>
                        </View>
                    }

                    <Menu name={id.current} ref={menuRef} >
                        <MenuTrigger />
                        <MenuOptions>
                            <MenuItem text="Copy to clipboard" icon="copy" onSelect={() => copyToClipboard(text)} />
                            <MenuItem
                                text={`${isStarred ? "Unstar" : "Star"} message`}
                                icon={`${isStarred ? "star" : "star-o"}`}
                                color={"yellow"}
                                iconPack={FontAwesome} onSelect={() => starMessage(messageId, chatId, userId)} />

                            <MenuItem text="Reply" icon="reply" iconPack={MaterialCommunityIcons} onSelect={setReply} />
                        </MenuOptions>
                    </Menu>

                </View>
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    Container: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 5,
        marginBottom: 10,
        borderColor: '#E2DACC',
        borderWidth: 1,
    },
    text: {
        letterSpacing: 0.3,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    time: {
        fontSize: 12,
        color: colors.grey,
        letterSpacing: 0.3
    },
    image: {
        height: 300,
        width: 300,
        marginBottom: 5
    }
});