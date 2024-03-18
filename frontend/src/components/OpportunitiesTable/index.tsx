import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Card as CardType } from "../types";
import { format } from "date-fns";

type Props = {
  cards: CardType[] | undefined;
};

const OpportunitiesTable: React.FC<Props> = ({ cards }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        boxShadow: 5,
        border: 1,
        borderColor: "lightgray",
        mt: 2,
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Foundation name</TableCell>
              <TableCell>Grant name</TableCell>
              <TableCell>Average amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Match date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards?.map(row => (
              <TableRow key={row?.id}>
                <TableCell>{row?.foundationName}</TableCell>
                <TableCell>{row?.grantName}</TableCell>
                <TableCell>{row?.averageAmount}$</TableCell>
                <TableCell>
                  <Chip
                    label={row?.status}
                    color={
                      row?.status === "Accepted"
                        ? "success"
                        : row?.status === "Rejected"
                        ? "error"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>{format(row?.deadline, "MMMM d")}</TableCell>
                <TableCell>{format(row?.matchDate, "MMMM d")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OpportunitiesTable;
