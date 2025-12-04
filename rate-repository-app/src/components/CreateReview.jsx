import { useFormik } from "formik";
import * as yup from "yup";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { use } from "react";
import Text from "./Text";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object({
  ownerName: yup.string().required("repository owner is required"),
  repositoryName: yup.string().required("repository name is required"),
  rating: yup
    .number()
    .required("rating is required")
    .min(0, "rating must be between 0 and 100")
    .max(100, "rating must be between 0 and 100"),
  text: yup.string().optional(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const CreateReview = () => {
  const navigate = useNavigate();

  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    try {
      const review = await createReview(values);
      console.log(review);
      navigate("/");
    } catch (e) {
      console.log("Error creating review:", e);
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
        placeholder={"Repository owner name"}
        onChangeText={formik.handleChange("ownerName")}
        value={formik.values.ownerName}
      />
      {formik.errors.ownerName && formik.touched.ownerName && (
        <Text style={{ color: "red" }}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={"Repository name"}
        onChangeText={formik.handleChange("repositoryName")}
        value={formik.values.repositoryName}
      />
      {formik.errors.repositoryName && formik.touched.repositoryName && (
        <Text style={{ color: "red" }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={"Rating between 0 and 100"}
        onChangeText={formik.handleChange("rating")}
        value={formik.values.rating}
      />
      {formik.errors.rating && formik.touched.rating && (
        <Text style={{ color: "red" }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={"Review"}
        onChangeText={formik.handleChange("text")}
        value={formik.values.text}
      />
      {formik.errors.text && formik.touched.text && (
        <Text style={{ color: "red" }}>{formik.errors.text}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

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

export default CreateReview;
