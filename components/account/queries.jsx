import gql from 'graphql-tag';

export const userQuery = gql`
  query {
    user{
      id
      email
      firstName
      lastName
    }
    messages @client {
      type
      text
    }
  }
`;

export const messageQuery = gql`
  query {
    messages @client {
      type
      text
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

export const addMessageMutation = gql`
  mutation AddMessageMutation($messages:[String]){
    addMessage(messages:$messages) @client
  }
`;