import React, { useEffect } from "react";
import CustomHeaderButton from "../../../components/custom-header-button.component";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { PageContainer } from "../../../components/utils/page-container";
import { colors } from "../../../infrastructure/theme/colors";
import { FontAwesome } from '@expo/vector-icons';
import { SearchBarContainer, SearchInput, UsersContainer, DefaultText } from "../components/new-chat.styles";
import { useState } from "react";

const NewChatScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState();
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchTerm, setSeachTerm] = useState('');

    useEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Close"
                        onPress={() => props.navigation.goBack()} />
                </HeaderButtons>
            },
            headerTitle: "New chat"
        })
    }, []);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (!searchTerm || searchTerm === "") {
                setUsers()
                setNoResultsFound(false);
                return;
            };

            setIsLoading(true);

            setUsers({});
            setNoResultsFound(true);

            setIsLoading(false);

        }, 500);

        return () => clearTimeout(delaySearch)
    }, [searchTerm]);

    return (
        <PageContainer>
            <SearchBarContainer>
                <FontAwesome name="search" size={15} color={colors.lightGrey} />
                <SearchInput onChangeText={setSeachTerm} />
            </SearchBarContainer>

            {
                !isLoading && noResultsFound && (
                    <UsersContainer>
                        <FontAwesome name="question" size={55} color={colors.lightGrey} />
                        <DefaultText>No users found</DefaultText>

                    </UsersContainer>
                )
            }

            {
                !isLoading && !users && (
                    <UsersContainer>
                        <FontAwesome name="users" size={55} color={colors.lightGrey} />
                        <DefaultText>Enter a name to search for a user</DefaultText>
                    </UsersContainer>
                )
            }

        </PageContainer>
    );
};

export default NewChatScreen;


