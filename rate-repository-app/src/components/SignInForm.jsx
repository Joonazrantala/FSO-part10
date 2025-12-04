import Text from "./Text";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import theme from "../theme";

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

const SignInForm = ({ authError, ...formik }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.errors.username ? styles.inputError : null,
        ]}
        placeholder="Username"
        placeholderTextColor="#586069"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.errors.password && formik.touched.password
            ? styles.inputError
            : null,
        ]}
        placeholder="Password"
        placeholderTextColor="#586069"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.errors.password && formik.touched.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      {authError && <Text style={{ color: "red" }}>{authError}</Text>}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};
export default SignInForm;
