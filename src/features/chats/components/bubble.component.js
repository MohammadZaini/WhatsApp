import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";

export const Bubble = props => {
    const { text, type } = props;

    const bubbleStyle = { ...styles.Container };
    const textStyle = { ...styles.text };
    const wrapperStyle = { ...styles.wrapperStyle }

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
            wrapperStyle.justifyContent = 'flex-end';
            // wrapperStyle.backgroundColor = '#E7FED6'
            break;

        case "theirMessage":
            wrapperStyle.justifyContent = 'flex-start';
            break;

        default:
            break;
    };

    return (
        <View style={wrapperStyle}>
            <View style={bubbleStyle}>
                <Text style={textStyle}>{text}</Text>
            </View>
        </View>
    )
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
    }
});