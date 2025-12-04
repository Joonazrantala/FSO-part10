import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryListContainer";
import AppBar from "./AppBar";
import { Route, Routes, Navigate, useParams } from "react-router-native";
import { SignInContainer } from "./SignInContainer";
import SingleRepositoryItem from "./SingleRepositoryItem";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import { PaperProvider } from "react-native-paper";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  console.log("Main component mounted");
  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppBar />
        <Text>Rate Repository Application</Text>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/signin" element={<SignInContainer />} />
          <Route path="/:id" element={<SingleRepositoryItem />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="my-reviews" element={<MyReviews />} />
        </Routes>
      </View>
    </PaperProvider>
  );
};

export default Main;
