import gql from 'graphql-tag';


export const 
login = gql`
  mutation Login($email:String , $password:String ){
    login(email :$email , password:$password) @client {
      message
      field
    }
  }
`,
loginErrors=gql`
  query LoginErrors{
    loginErrors @client{
      field
      message
    }
    user {
      email
      username
    }
  }
`,
  socialLogin=gql`
  mutation SocialLogin($url:String!,$accessToken:String!){
    socialLogin(url:$url,accessToken:$accessToken)@client
  }
  `
;
