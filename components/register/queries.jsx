import gql from 'graphql-tag';

export const register = gql`
  mutation Register($username:String,$email:String , $password1:String ,$password2:String ){
    register(username:$username,email :$email , password1:$password1 ,password2 : $password2) @client 
  }
`,registerErrors=gql`
  query RegisterErrors{
    registerErrors @client{
      field
      message
    }
    user {
      email
      username
    }
  }
`;

