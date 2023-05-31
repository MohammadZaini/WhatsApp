import { StyleSheet } from "react-native"
import { Container, FieldLabel, InputContainer, AuthInput, ErrorContainer, ErrorText } from "./input.styles";

import { colors } from "../../../infrastructure/theme/colors";

export const Input = props => {

    const onChangeText = text => {
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
            />
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
