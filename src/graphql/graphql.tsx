import {ApolloClient, ApolloError, gql, InMemoryCache} from "@apollo/client";
import {toast} from "react-hot-toast";

export const client = new ApolloClient({
    uri: 'https://api.digitalshop.evgenick.com/api/v1',
    cache: new InMemoryCache(),
});

export const SIGNUP_WITHOUT_CODE_MUTATION = gql`
    mutation ($nickname: String!, $email: String!, $password: String!) {
        authSignupWithoutCode(input: { nickname: $nickname, email: $email, password: $password })
    }
`;

export const SIGNUP_WITH_CODE_MUTATION = gql`
    mutation ($nickname: String!, $email: String!, $password: String!, $code: String!) {
        authSignupWithCode(
            input: {nickname: $nickname, email: $email, password: $password, code: $code}
        ) {
            token
            user {
                uuid
                nickname
                email
            }
        }
    }
`;

interface signupWithoutCodeMutationProps {
    nickname: string;
    email: string;
    password: string;
}

export async function signupWithoutCodeMutation({nickname, email, password}: signupWithoutCodeMutationProps) {
    try {
        const response = await client.mutate({
            mutation: SIGNUP_WITHOUT_CODE_MUTATION,
            variables: {
                nickname,
                email,
                password
            }
        });
        return JSON.parse(response.data.authSignupWithoutCode);
    } catch (error) {
        return error;
    }
}

interface signupWithCodeMutationProps {
    nickname: string;
    email: string;
    password: string;
    code: string;
}

export async function signupWithCodeMutation({nickname, email, password, code}: signupWithCodeMutationProps) {
    try {
        const response = await client.mutate({
            mutation: SIGNUP_WITHOUT_CODE_MUTATION,
            variables: {
                nickname,
                email,
                password,
                code
            }
        });
        return JSON.parse(response.data.authSignupWithoutCode);
    } catch (error) {
        if (error instanceof ApolloError) {
            return error.message;
        } else {
            toast.error("Ошибка выполнения запроса");
            console.log(error)
        }
    }
}