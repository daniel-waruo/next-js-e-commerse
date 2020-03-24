import gql from 'graphql-tag';

export default gql`
  type Error{
    message : String 
    field : String
  }
  type CartProduct{
      productID : String
      number : Int
  }
  type ProductDialog{
    visible: Boolean
    productID : String
  }
  type CartDialog{
    visible: Boolean
    status : String
    productName: String
  }
  type Message{
    type : String
    text : String
  }
  
  extend type Query {
    messages : [Message]
    cartDialog : CartDialog
    productDialog : ProductDialog
    loginErrors : [Error]
    registerErrors : [Error]
  }
  extend type Mutation {
    showProductDialog(productID:String! ) : Boolean
    removeProductDialog : Boolean
      
    showCartDialog(status:String!,productName:String!): Boolean
    removeCartDialog : Boolean
      
    login(email:String! ,password:String) : Boolean
    socialLogin(url:String!,accessToken:String!) : Boolean
    register(
      email : String! ,
      username : String!,
      password1 : String!,
      password2 : String!
    ) : Boolean  
    logout : Boolean
    
    addToCart(productID:String!,productNumber:Int!) : Boolean
    
    removeFromCart(productID: String!) : Boolean
    updateCart(products:[CartProduct]) : Boolean
    applyFilters(categories:[String]) : Boolean
          
    addMessage(message:String!) : Boolean
  }
`;
