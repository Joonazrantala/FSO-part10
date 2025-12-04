import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import { useDebounce } from "use-debounce";

const SearchBar = ({ filter, setFilter }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debounced] = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    setFilter(debounced);
  }, [debounced]);

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.input}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "grey",
  },
});
