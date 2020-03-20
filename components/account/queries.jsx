import gql from 'graphql-tag';

export const userQuery = gql`
    query {
        user{
          email
          firstName
          lastName
        }
    }
`;