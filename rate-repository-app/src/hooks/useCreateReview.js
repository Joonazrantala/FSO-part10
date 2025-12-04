import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { GET_REPOSITORIES, ME } from "../graphql/queries";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_REPOSITORIES }, { query: ME }],
  });

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const reviewInput = {
      ownerName,
      repositoryName,
      rating: Number(rating),
      text,
    };
    const response = await mutate({
      variables: { review: reviewInput },
    });

    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
