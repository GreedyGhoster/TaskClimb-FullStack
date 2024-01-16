import { styled } from "@mui/material/styles";

export const Counter = styled("div")(({ theme }) => ({
  height: "1.6rem",
  margin: "auto",
  marginTop: "0.5%",
  display: "inline-flex",
  borderBottom: "1px groove #b5b3b3",
  gap: "1rem",
  fontSize: "1.2rem",
  textAlign: "center",
  [theme.breakpoints.down("tablet")]: {
    width: "100%",
  },
  [theme.breakpoints.up("tablet")]: {
    width: "70%",
  },
  [theme.breakpoints.up("desktop")]: {
    width: "45%",
  },
}));
