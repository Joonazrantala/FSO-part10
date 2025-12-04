import { useQuery } from "@apollo/client/react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { SINGLE_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";

const SingleRepositoryItem = (props) => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  if (loading) return <Text>Loading ...</Text>;
  if (error) return <Text>Error occurred {error.message}</Text>;

  const reviews = data.repository.reviews.edges
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <RepositoryItem item={data.repository} showUrl={true} />

      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    </>
  );
};

export default SingleRepositoryItem;
