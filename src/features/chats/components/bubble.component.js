import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const Bubble = props => {
    const { text, type } = props;

    const bubbleStyle = { ...styles.Container };
    const textStyle = { ...styles.text };

    switch (type) {
        case "system":
            textStyle.color = '#65644A';
            bubbleStyle.backgroundColor = colors.beige;
            bubbleStyle.alignItems = "center";
            bubbleStyle.marginTop = 10;
            break;

        default:
            break;
    }

    return (
        <View style={styles.wrapperStyle}>
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

// const Container = styled.View`
//     flex-direction: row;
//     justify-content: center;
// `;

const TextContainer = styled.View`
    background-color: white;
    border-radius: 6px;
    padding: 5px;
    margin-bottom: 10px;
    border-color: #E2DACC;
    border-width: 1px;
`;