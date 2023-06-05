import React, { useEffect } from "react";
import CustomHeaderButton from "../../../components/custom-header-button.component";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { PageContainer } from "../../../components/utils/page-container";
import { colors } from "../../../infrastructure/theme/colors";
import { FontAwesome } from '@expo/vector-icons';
import { SearchBarContainer, SearchInput, UsersContainer, DefaultText, LoadingContainer } from "../components/new-chat.styles";
import { useState } from "react";
import { searchUsers } from "../../../components/utils/actions/user-actions";
import { ActivityIndicator } from "react-native-paper";
import { FlatList, Text, View } from "react-native";
import { DataItem } from "../components/data-item.component";

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
        const delaySearch = setTimeout(async () => {
            if (!searchTerm || searchTerm === "") {
                setUsers()
                setNoResultsFound(false);
                return;
            };

            setIsLoading(true);

            const usersResult = await searchUsers(searchTerm);
            setUsers(usersResult);

            if (Object.keys(usersResult).length === 0) {
                setNoResultsFound(true);
            } else {
                setNoResultsFound(false);
            }

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
                isLoading &&
                <LoadingContainer>
                    <ActivityIndicator size="large" color={colors.primary} />
                </LoadingContainer>

            }

            {
                !isLoading && !noResultsFound && users &&
                <FlatList
                    data={Object.keys(users)}
                    renderItem={({ item }) => {
                        const userData = users[item]
                        return (
                            <DataItem
                                title={`${userData.firstName} ${userData.lastName}`}
                                subTitle={userData.about}
                                image={userData.profilePicture}
                            />
                        )
                    }}
                />
            }

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


