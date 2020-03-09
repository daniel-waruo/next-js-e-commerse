import gql from 'graphql-tag';

export const cartQuery = gql`
    query {
        cart{
            products{
              product{
                id
                images {
                  image
                }  
                name
                price
                discountPrice
                slug
                category{
                  slug
                }
              }
              number
              total
            }
            total
        }
    }
`;

export const removeFromCart = gql`
  mutation RemoveFromCart($productID:String ){
    removeFromCart(productID:$productID) @client
  }
`;
export const updateCart = gql`
  mutation UpdateCart($products:[CartProduct] ){
    updateCart(products:$products) @client
  }
`;