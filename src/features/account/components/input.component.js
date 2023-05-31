import { StyleSheet, Text, TextInput, View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Container, FieldLabel, InputContainer, AuthInput, ErrorContainer, ErrorText } from "./input.styles";

import { colors } from "../../../infrastructure/theme/colors";
import { useState } from "react";

export const Input = props => {

    const [value, setValue] = useState(props.initialValue)

    const onChangeText = text => {
        setValue(text);
        props.onInputChanged(props.id, text);
    }

    return <Container>
        <FieldLabel>{props.label}</FieldLabel>

        <InputContainer>
            {
                props.icon && <props.iconPack
                    name={props.icon}
                    size={props.iconSize || 15}
                    style={styles.icon} />
            }
            <AuthInput
                {...props}
                onChangeText={onChangeText}
                value={value} />
        </InputContainer>

        {
            props.errorText &&
            <ErrorContainer>
                <ErrorText>{props.errorText[0]}</ErrorText>
            </ErrorContainer>
        }
    </Container>
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
        color: colors.grey
    },
})
