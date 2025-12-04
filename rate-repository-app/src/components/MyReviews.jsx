import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import Text from "./Text";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "network-only",
  });

  if (loading) return <Text>Loading ...</Text>;
  if (error) return <Text>Error occurred {error.message}</Text>;

  const reviews = data?.me.reviews.edges
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View>
      {reviews && reviews.length === 0 && <Text>No reviews yet</Text>}
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem review={item} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default MyReviews;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
