import gql from 'graphql-tag';


export const APP_QUERY = gql`
   query App {
    user{
        username
        email
    }
    cart{
        products{
        id
        product{
            name
            discountPrice
            discountPriceCurrency
        }
        number
        }
    }
    addCartVisible @client
    addCartProductID @client
    }
    `;
export const PRODUCT_QUERIES = gql`
  query Product($productID:String!){
    product(id:$productID){
        id
        name
        price
        discountPrice
        description
        images {
          image
        }
        slug
        category{
          slug
        }
    }
  }
`;

export const removeDialog = gql`
  mutation {
    removeProductDialog @client
  }
`;

export const addToCart = gql`
  mutation AddToCart($productID : String!,$productNumber : Int!) {
    addToCart(productID:$productID , productNumber:$productNumber) @client
  }
`;

export const showProductDialog = gql`
  mutation ShowProductDialog($productID:String){
    showProductDialog(productID :$productID) @client
  }
`;