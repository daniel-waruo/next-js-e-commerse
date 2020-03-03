import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
query FilterProducts($ids:[String],$slugs:[String],$query:String){
  filterProducts(query:$query,categoryIds:$ids,categorySlugs:$slugs) {
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
          category{
            slug
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