import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from './Text';
import { Link, useNavigate } from "react-router-native";
import { ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import { Navigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const apolloClient = useApolloClient()
  const navigate = useNavigate()
  const authStorage = useAuthStorage()
  const {data, loading, error} = useQuery(ME)

  if (loading) return <Text>Loading ...</Text>
  if (error) return <Text>Error occurred {error}</Text>

  const user = data?.me

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore()
    navigate("/")
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <Link to="/" style={styles.link}>
            <Text style={styles.text}>Repositories</Text>
          </Link>

          {user ? (
          <Pressable onPress={handleSignOut} style={styles.link}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" style={styles.link}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
