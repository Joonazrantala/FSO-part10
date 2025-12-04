import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import RepoSort from "./RepoSort";
import * as React from "react";
import SearchBar from "./Searchbar";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { handleSelect, filter, setFilter } = this.props;

    return (
      <View>
        <RepoSort handleSelect={handleSelect} />
        <SearchBar setFilter={setFilter} filter={filter} />
      </View>
    );
  };

  render() {
    const { repositories, navigate } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader} //class property
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [filter, setFilter] = React.useState("");
  const [sortBy, setSortBy] = React.useState(["CREATED_AT", "DESC"]);
  const [debouncedFilter] = useDebounce(filter, 500);
  navigate = useNavigate();

  function handleSelect(sortOrder) {
    sortOrder === "LATEST"
      ? setSortBy(["CREATED_AT", "DESC"])
      : sortOrder === "HIGHEST"
        ? setSortBy(["RATING_AVERAGE", "DESC"])
        : setSortBy(["RATING_AVERAGE", "ASC"]);
  }

  const { repositories, loading, error } = useRepositories(
    sortBy,
    debouncedFilter,
  );
  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      handleSelect={handleSelect}
      filter={filter}
      setFilter={setFilter}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
