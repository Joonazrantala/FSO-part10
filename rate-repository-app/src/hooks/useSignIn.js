import { AUTHENTICATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client/react";

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({username, password}) => {
    const result = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    await authStorage.setAccessToken(result.data.authenticate.accessToken)
    apolloClient.resetStore();
    console.log(await authStorage.getAccessToken())
    return result
  };

  return [signIn, result];
};

export default useSignIn;