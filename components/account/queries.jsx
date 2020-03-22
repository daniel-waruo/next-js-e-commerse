import gql from 'graphql-tag';

export const userQuery = gql`
    query {
        user{
          id
          email
          firstName
          lastName
        }
    }
`;


export const userEditMutation = gql`
    mutation EditUserMutation($firstName:String,$lastName:String,$email:String) {
      editUserInformation(firstName:$firstName,lastName:$lastName,email:$email){
        user{
          id
          email
          firstName
          lastName
        }
      }
    }
`;