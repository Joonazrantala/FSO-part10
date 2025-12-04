import { Pressable, TextInput, View } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import { StyleSheet } from "react-native";
import useSignUp from "../hooks/useSignUp";
import { useState } from "react";

const initialValues = {
  username: "",
  password: "",
  passwordAgain: "",
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(5, "username must be between 5 and 30 characters long")
    .max(30, "username must be between 5 and 30 characters long"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "password must be between 5 and 30 characters long")
    .max(30, "password must be between 5 and 30 characters long"),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match")
    .required("Password confirm is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, result] = useSignUp();
  const [serverError, setServerError] = useState(null);

  const onSubmit = async (values) => {
    try {
      const newUser = await signUp(values);
      console.log(newUser);
      navigate("/");
    } catch (e) {
      if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        const message = e.graphQLErrors[0].message;
        console.log("Sign up error:", message);
        setServerError(message);
        console.log(serverError);
      } else {
        console.log("Sign up error:", e.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"username"}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      {formik.errors.username && formik.touched.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={"password"}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />
      {formik.errors.password && formik.touched.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        onChangeText={formik.handleChange("passwordAgain")}
        value={formik.values.passwordAgain}
        secureTextEntry
      />
      {formik.errors.passwordAgain && formik.touched.password && (
        <Text style={{ color: "red" }}>{formik.errors.passwordAgain}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Text>{serverError}</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "grey",
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
