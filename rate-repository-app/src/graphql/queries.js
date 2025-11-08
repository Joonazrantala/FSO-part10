import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    stargazersCount
    forksCount
		reviewCount
		ratingAverage
    language
    url
    ownerAvatarUrl
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const ME = gql`
  query getMe {
    me {
      id
      username
    }
}`