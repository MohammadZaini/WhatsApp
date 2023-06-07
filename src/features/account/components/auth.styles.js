import { TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const Link = styled.Text`
    color: ${colors.blue};
    letter-spacing: 0.3px;
`;

export const LinkConainer = styled(TouchableOpacity).attrs(props => ({
    onPress: props.onPress
}))`
    justify-content: center;
    align-items: center;
    margin-vertical: 15px;
`;

export const LogoContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Logo = styled(Image).attrs({
    source: require("../../../../assets/images/logo.png"),
    resizeMode: "contain",
})`
    width: 50%;
`;

export const KeyboardAvoiding = styled(KeyboardAvoidingView).attrs({
    behavior: Platform.OS === "ios" ? "height" : undefined,
    keyboardVerticalOffset: 100,
})`
    flex: 1;
    justify-content: center;
`;