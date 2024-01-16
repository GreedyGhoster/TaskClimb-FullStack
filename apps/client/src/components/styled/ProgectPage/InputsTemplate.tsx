import { styled } from "@mui/material/styles";

export const InputsTemplate = styled("div")(({ theme }) => ({
  gap: "1rem",
  textAlign: "center",
  margin: "auto",
  marginTop: "2.3%",
  [theme.breakpoints.down("laptop")]: {
    display: "table-column",
  },
  [theme.breakpoints.up("laptop")]: {
    display: "inline-flex",
  },
}));
