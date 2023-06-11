import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const Container = styled.View`
    flex-direction: row;
    padding-vertical: 7px;
    border-bottom-color: ${colors.extraLightGrey};
    border-bottom-width: 1px;
    align-items: center;
    min-height: 50px;
`;

export const TextContainer = styled.View`
    margin-left: 14px;
    flex: 1;
`;

export const Title = styled.Text.attrs(props => ({
    numberOfLines: props.numberOfLines,
}))`
    font-size: 16px;
    letter-spacing: 0.3px;
`;

export const SubTitle = styled.Text.attrs(props => ({
    numberOfLines: props.numberOfLines,
}))`
    font-size: 16px;
    letter-spacing: 0.3px;
    color: ${colors.grey}
`;
