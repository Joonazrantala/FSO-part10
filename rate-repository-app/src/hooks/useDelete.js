import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_REPOSITORIES } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    fetchPolicy: "no-cache",
    refetchQueries: [{ query: GET_REPOSITORIES }],
  });

  const deleteReview = async (id) => {
    console.log(id);
    const response = await mutate({
      variables: { deleteReviewId: id },
    });
    console.log(response);
    return response;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
