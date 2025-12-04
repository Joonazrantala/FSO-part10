import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortBy, filter) => {
  const { data, loading, error } = useQuery(
    GET_REPOSITORIES,
    {
      variables: {
        orderBy: sortBy[0],
        orderDirection: sortBy[1],
        searchKeyword: filter,
      },
    },
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const repositories = data ? data.repositories : null;
  return { repositories, loading, error };
};

export default useRepositories;
