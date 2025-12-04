import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import theme from "../theme";
import { StyleSheet } from "react-native";

const RepoSort = ({ handleSelect }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        style={styles.menuButton}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Sort repositories by</Button>}
      >
        <Menu.Item
          onPress={() => handleSelect("LATEST")}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => handleSelect("HIGHEST")}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => handleSelect("LOWEST")}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export default RepoSort;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  menuButton: {
    borderRadius: theme.roundness,
  },
});
