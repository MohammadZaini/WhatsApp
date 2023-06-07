import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageContainer } from "../../../components/utils/page-container";

import { SignInForm } from "../components/sign-in-form.component";
import { SignUpForm } from "../components/sign-up-form.component";
import { KeyboardAvoiding, Link, LinkConainer, Logo, LogoContainer } from "../components/auth.styles";
import { ScrollView } from "react-native";

export const AuthScreen = () => {
    const [isSigned, setIsSignUp] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <PageContainer  >
                <ScrollView>
                    <KeyboardAvoiding
                        behavior={Platform.OS === "ios" ? "height" : undefined}
                        keyboardVerticalOffset={100}
                    >
                        <LogoContainer>
                            <Logo />
                        </LogoContainer>
                        {
                            isSigned ? <SignUpForm /> : <SignInForm />
                        }

                        <LinkConainer onPress={() => setIsSignUp(prevState => !prevState)} >
                            <Link>{`Switch to ${isSigned ? "sign in" : "sign up"}`}</Link>
                        </LinkConainer>
                    </KeyboardAvoiding>
                </ScrollView>
            </PageContainer>
        </SafeAreaView >
    );
};



// const AuthInput = styled(TextInput).attrs({
//     textContentType: "name",
//     activeUnderlineColor: "green",
// })`
//     borderRadius: 5px;
//     height: 40px; 
//     flex: 1;
//     margin-left: 10px;
// `;

// const InputContainer = styled.View`
//     flex-direction: row;
//     align-items: center;
//     margin-bottom: 30px;
//     margin-top: 10px;
// `;

// const ErrorContainer = styled.View`
//     margin-vertical: 5px;
// `;

// const ErrorMessage = styled.Text`
//     color: red;
//     font-size: 13px;
//     letter-spacing: 0.3px;
//     margin-left: 35px;
// `;

{/* <InputContainer >
                    <FontAwesome name="user-o" size={24} color="green" />
                    <AuthInput label="First Name" />
                </InputContainer>

                <InputContainer>
                    <FontAwesome name="user-o" size={24} color="green" />
                    <AuthInput label="Last Name" />
                </InputContainer>

                <InputContainer>
                    <Feather name="mail" size={24} color="green" />
                    <AuthInput label="Email" />
                </InputContainer>

                <InputContainer>
                    <Feather name="lock" size={24} color="green" />
                    <AuthInput label="Password" />
                </InputContainer>

                <ErrorContainer>
                    <ErrorMessage>Wrong password</ErrorMessage>
                </ErrorContainer> */}