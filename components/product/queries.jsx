import gql from 'graphql-tag';

export const PRODUCT_QUERIES = gql`
query Product( $productSlug: String! ){
  product(slug : $productSlug) {
      id
      name
      price
      discountPrice
      description
      images {
        image
      }
  }
}
`;