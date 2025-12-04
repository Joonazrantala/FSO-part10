import { StyleSheet, Image } from "react-native";
import theme from "../theme";
import { View, Alert } from "react-native";
import Text from "./Text";
import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDelete";

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDelete = async () => {
    try {
      const response = await deleteReview(review.id);
      refetch();
    } catch (e) {
      console.log("Error creating review:", e);
    }
  };

  const createAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancelled"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete() },
      ],
    );

  const date = new Date(review.createdAt);
  return (
    <View>
      <View testID="reviewItem" style={styles.container}>
        <View style={styles.row}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{review.rating}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              color="textPrimary"
              style={styles.fullName}
            >
              {review.user ? review.user.username : review.repository.name}
            </Text>

            <Text color="textSecondary" style={styles.description}>
              {date.toLocaleDateString("fi-FI")}
            </Text>

            <View style={styles.languageContainer}>
              <Text style={styles.language}>{review.text}</Text>
            </View>
          </View>
        </View>
        {review.repository && (
          <View style={styles.statsRow}>
            <Pressable
              style={styles.button}
              onPress={() => navigate(`/${review.repository.id}`)}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={createAlert}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "flex-start" },
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
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between", // optional
  },
  deleteButton: {
    backgroundColor: "#bb0e0eff",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
  },
});
