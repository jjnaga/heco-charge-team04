import gql from "graphql-tag";

const TRANSACTIONS = gql`
    {
      chargestations(orderBy: endtime) {
        station,
        starttime,
        endtime,
        duration, 
        energy,
      }
    }
`;

