import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from './RepositoryItem';
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories()
    if (loading) return <Text>Loading</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
