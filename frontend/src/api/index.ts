import { gql } from "@apollo/client";

export const GET_ALL_CARDS = gql`
  query {
    getGrantOpportunityCards {
      edges {
        id
        grantId
        foundationName
        grantName
        averageAmount
        deadline
        location
        areas
        status
        matchDate
      }
    }
  }
`;

export const UPDATE_GRANT_OPPORTUNITY = gql`
  mutation updateGrantOpportunity(
    $opportunityId: String!
    $isApproved: Boolean!
  ) {
    updateGrantOpportunity(
      opportunityId: $opportunityId
      isApproved: $isApproved
    )
  }
`;
