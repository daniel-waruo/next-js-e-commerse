import gql from 'graphql-tag';

export const HOME_QUERIES = gql`
query {
    allCarousel {
        id
        urlTo
        imageUrl
        title
        caption
    }
    allCategories {
        id
        name
        slug
    }
    allFeaturedProducts {
      product {
        id
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
`;