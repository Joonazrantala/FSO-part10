import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from "yup"
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "aliceblue",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "grey",
  },
  inputError: {
    borderColor: "red"
  },
  button: {
    backgroundColor: "blue",
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

const initialValues = {
  username: "",
  password: ""
}

const validationSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required")
})

const SignInForm = () => {
  const navigate = useNavigate()

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

   return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username ? styles.inputError : null]}
        placeholder="Username"
        placeholderTextColor="#586069"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.errors.username && (
        <Text style={{color: "red"}}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[styles.input,
          formik.errors.password && formik.touched.username ? styles.inputError : null
        ]}
        placeholder="Password"
        placeholderTextColor="#586069"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.errors.password && formik.touched.password && (
        <Text style={{color: "red"}}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};



export default SignInForm;
