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
                id
            }
            number
          }
      }
      productDialog @client {
        visible
        productID
      }
      cartDialog @client{
        visible
        status
        productName
      }
    }
    `;
export const PRODUCT_QUERIES = gql`
  query Product($productID:String!){
    product(id:$productID){
        id
        name
        price
        inCart
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

// add to cart mutation
export const addToCart = gql`
  mutation AddToCart($productID : String!,$productNumber : Int!) {
    addToCart(productID:$productID , productNumber:$productNumber) @client
  }
`;
// show product dialog mutation
export const showProductDialog = gql`
  mutation ShowProductDialog($productID:String){
    showProductDialog(productID :$productID) @client
  }
`;

// remove product Dialog mutation
export const removeProductDialog = gql`
  mutation RemoveProductDialog{
    removeProductDialog @client
  }
`;

// show product dialog mutation
export const showCartDialog = gql`
  mutation ShowCartDialog($status:String,$productName:String){
    showCartDialog(status :$status,productName:$productName) @client
  }
`;

// remove product Dialog mutation
export const removeCartDialog = gql`
  mutation RemoveCartDialog {
    removeCartDialog @client
  }
`;

