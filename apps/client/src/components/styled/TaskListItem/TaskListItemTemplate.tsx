import { styled } from "@mui/material/styles";

export const TaskListItemTemplate = styled("div")(({ theme }) => ({
  padding: 0,
  height: "3rem",
  margin: "auto",
  borderBottom: "1px groove #343739",
  fontSize: "1.3rem",
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
