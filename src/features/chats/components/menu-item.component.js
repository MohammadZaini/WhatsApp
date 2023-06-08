import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import { Feather } from '@expo/vector-icons';

export const MenuItem = props => {

    const Icon = props.iconPack ?? Feather

    return <MenuOption onSelect={props.onSelect} >
        <View style={styles.menuItemContainer} >
            <Text style={styles.menuText} >{props.text}</Text>
            <Icon name={props.icon} size={18} color={props.color} />
        </View>
    </MenuOption>
};

const styles = StyleSheet.create({
    menuItemContainer: {
        flexDirection: 'row',
        padding: 5
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        letterSpacing: 0.3
    }
});