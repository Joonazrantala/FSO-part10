import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const RepositoryItem = ({ item }) => {
  // 1000 to 1k
  const formatCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 50, height: 50, marginRight: theme.spacing.m }}
        ></Image>
        <View style={{ flexGrow: 1 }}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            color="textPrimary"
            style={styles.fullName}
          >
            {item.fullName}
          </Text>

          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>

          <View style={styles.languageContainer}>
            <Text style={styles.language}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  languageContainer: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness / 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: theme.spacing.m,
  },
  language: {
    color: "white",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
});

export default RepositoryItem;
