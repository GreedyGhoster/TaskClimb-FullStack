import { styled } from "@mui/material/styles";

export const TaskPageTemplate = styled("div")(({ theme }) => ({
  backgroundColor: `${theme.palette.mode === "dark" ? "#262626" : "#e0e0e0"}`,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  border: "none",
  height: "auto",
  margin: "auto",
  padding: "0",
  [theme.breakpoints.down("laptop")]: {
    width: "85vw",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "30vw",
  },
}));
