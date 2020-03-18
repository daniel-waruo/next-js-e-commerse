import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query FilterProducts($ids: [String], $slugs: [String], $query: String ,$min:String ,$max:String) {
    filterProducts(query: $query, categoryIds: $ids, categorySlugs: $slugs,min:$min,max:$max) {
      products {
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
            category {
              slug
            }
            slug
          }
        }
      }
      category{
        name
        description
      }
      filterPrice {
        min
        max
      }
    }
    allCategories {
      id
      name
    }
  }
`;