import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import SignInForm from "./SignInForm";
import { useState } from "react";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

export const SignInContainer = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
      setAuthError("Wrong username or password");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return <SignInForm {...formik} authError={authError}></SignInForm>;
};

export default SignInContainer;
