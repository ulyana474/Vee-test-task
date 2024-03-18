import { Box } from "@mui/material";
import InfoCard from "../../components/InfoCard";
import OpportunitiesTable from "../../components/OpportunitiesTable";
import Header from "../../components/Header";
import { useQuery } from "@apollo/client";
import { QueryData } from "../../components/types";
import { GET_ALL_CARDS } from "../../api";

const MainPage = () => {
  const { data, refetch } = useQuery<QueryData>(GET_ALL_CARDS);
  const cards = data?.getGrantOpportunityCards?.edges;

  return (
    <>
      <Header />

      <Box sx={{ padding: 2 }}>
        {cards && cards.length > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {cards.map(item => {
                return <InfoCard key={item.id} card={item} refetch={refetch} />;
              })}
            </Box>

            <OpportunitiesTable cards={cards} />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            No data to show
          </Box>
        )}
      </Box>
    </>
  );
};

export default MainPage;
