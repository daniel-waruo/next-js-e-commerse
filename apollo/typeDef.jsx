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
    extend type Query {
        addCartVisible : Boolean
        addCartProductID : String
        userLoggedIn : User
        loginErrors : [Error]
        registerErrors : [Error]
    }
    extend type Mutation {
        showProductDialog(productID:String! ) : Boolean
        removeProductDialog : Boolean
        
        login(email:String! ,password:String) : Boolean
        socialLogin(url:String!,accessToken:String!) : Boolean
        register(
            email:String! ,
            username:String!,
            password1: String!,
            password2:String!
            ) : Boolean
        
        logout : Boolean

        addToCart(productID:String!,productNumber:Int!) : Boolean
        removeFromCart(productID: String!) : Boolean
        
        updateCart(products:[CartProduct]) : Boolean
        
        applyFilters(categories:[String]) : Boolean
    }
    extend type User {
        isAuthenticated : Boolean
    }
`;
