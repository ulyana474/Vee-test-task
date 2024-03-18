export type Card = {
  id: string;
  grantId: string;
  foundationName: string;
  grantName: string;
  averageAmount: number;
  deadline: string;
  location: string;
  areas: string[];
  status: string;
  matchDate: string;
};

export type QueryData = {
  getGrantOpportunityCards: {
    edges: Card[];
  };
};
