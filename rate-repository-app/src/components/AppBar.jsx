import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";
import { ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#24292e", // GitHub-style dark app bar
    paddingHorizontal: 10,
  },
  scroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    marginRight: 20,
    marginBottom: 20
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <Link to="/" style={styles.link}>
            <Text style={styles.text}>Repositories</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
