import { styled } from "@mui/material/styles";

export const ProfileTemplate = styled("div")(({ theme }) => ({
  backgroundColor: `${theme.palette.mode === "dark" ? "#262626" : "#f5f5f5"}`,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  height: "auto",
  margin: "auto",
  padding: "0",
  marginTop: "3%",
  [theme.breakpoints.down("laptop")]: {
    width: "85%",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "50%",
  },
}));
