import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn, signInResult] = useSignIn();

  const signUp = async ({ username, password }) => {
    const newUser = {
      username,
      password,
    };

    const response = await mutate({
      variables: { user: newUser },
    });
    console.log(response);
    await signIn(newUser);
    return response;
  };

  return [signUp, result];
};

export default useSignUp;
