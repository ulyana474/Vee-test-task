import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  CardHeader,
  IconButton,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { format } from "date-fns";
import { Card as CardType } from "../types";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useMutation } from "@apollo/client";
import { UPDATE_GRANT_OPPORTUNITY } from "../../api";

type Props = {
  card: CardType;
  refetch: () => void;
};

const InfoCard: React.FC<Props> = ({ card, refetch }) => {
  const [updateGrantOpportunity] = useMutation(UPDATE_GRANT_OPPORTUNITY);

  const handleThumbsUpClick = () => {
    updateGrantOpportunity({
      variables: {
        opportunityId: card?.id,
        isApproved: true,
      },
    }).then(() => refetch());
  };

  const handleThumbsDownClick = () => {
    updateGrantOpportunity({
      variables: {
        opportunityId: card?.id,
        isApproved: false,
      },
    }).then(() => refetch());
  };

  return (
    <Card
      sx={{
        width: "300px",
        borderRadius: "12px",
        boxShadow: 5,
        border: 1,
        borderColor: "lightgray",
      }}
    >
      <CardContent>
        <CardHeader
          sx={{ padding: 0 }}
          avatar={
            <Box
              sx={{
                width: "40px",
                height: "40px",
                backgroundColor: "red",
                borderRadius: "50%",
                textAlign: "center",
                color: "white",
                lineHeight: "40px",
                fontWeight: "bold",
              }}
            >
              {card.grantName.charAt(0).toUpperCase()}
            </Box>
          }
          action={
            <>
              <IconButton
                aria-label="thumbs up"
                onClick={() => handleThumbsUpClick()}
              >
                {card.status === "Accepted" ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOffAltIcon />
                )}
              </IconButton>
              <IconButton
                aria-label="thumbs down"
                onClick={() => handleThumbsDownClick()}
              >
                <ThumbDownOffAltIcon />
              </IconButton>
            </>
          }
        />

        <Typography variant="h6" sx={{ fontSize: 14, color: "gray", mt: 2 }}>
          {card?.foundationName}
        </Typography>

        <Typography variant="h4" sx={{ fontSize: 18, fontWeight: "bold" }}>
          {card?.grantName}
        </Typography>

        <Box
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              backgroundColor: "salmon",
              borderRadius: "8px",
              padding: "12px",
              width: "130px",
            }}
          >
            <Stack direction="column" justifyContent="center">
              <MonetizationOnIcon
                sx={{
                  color: "#fff",
                  marginBottom: "8px",
                }}
              />
              <Typography sx={{ color: "#fff" }}>
                {card?.averageAmount}$
              </Typography>
              <Typography sx={{ color: "#fff" }}>Avg Amount</Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              backgroundColor: "wheat",
              borderRadius: "8px",
              padding: "16px",
              width: "130px",
            }}
          >
            <Stack direction="column">
              <Typography sx={{ color: "gray", fontSize: 12 }}>
                Deadline
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {format(card?.deadline, "MMMM d")}
              </Typography>
              <hr />
              <Typography sx={{ color: "gray", fontSize: 12 }}>
                Getting Started
              </Typography>
              <Typography sx={{ fontSize: 14 }}>Apply online</Typography>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Location
          </Typography>
          <Typography component="div" sx={{ fontWeight: "bold", fontSize: 14 }}>
            {card?.location}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Area of Funding
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {card?.areas.map(item => {
            return (
              <Chip
                key={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                sx={{
                  "& .MuiChip-label": {
                    fontSize: "12px",
                  },
                }}
              />
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
