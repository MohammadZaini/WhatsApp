import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { authenticate, setDidTryAutologin } from "../../../../store/auth-slice";
import styled from "styled-components";
import { getUserData } from "../../../components/utils/actions/user-actions";

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;
export const StartUpScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const storedAuthInfo = await AsyncStorage.getItem("userToken");

            if (!storedAuthInfo) {
                dispatch(setDidTryAutologin())
                return;
            }

            const parsedData = JSON.parse(storedAuthInfo);
            const { token, userId, expiryDate: expiryDateString } = parsedData;
            const expiryDate = new Date(expiryDateString);

            if (expiryDate <= new Date || !token || !userId) {
                dispatch(setDidTryAutologin());
                return;
            };

            const userData = await getUserData(userId);
            dispatch(authenticate({ token: token, userData }));
        };
        tryLogin();
    }, [dispatch])

    return (
        <Container>
            <ActivityIndicator size="large" color={colors.primary} />
        </Container>
    );
};