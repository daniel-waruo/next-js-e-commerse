import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
query FilterProducts($ids:[String],$query:String){
  filterProducts(query:$query,categoryIds:$ids) {
    edges {
      node {
          id
          pk
          name
          price
          discountPrice
          description
          images {
            image
          }
          slug
      }
    }
  }
  allCategories{
    id
    name
  }
}

`;