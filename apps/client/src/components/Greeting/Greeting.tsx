import Box from "@mui/material/Box";

export function Greeting() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1.4rem",
      }}
      component={"div"}
    >
      <Box
        sx={{
          height: "4.5rem",
        }}
        component={"div"}
      >
        <Box component={"h2"}>Welcome</Box>
      </Box>
      <span>To get started, go to "Home" or create a new project</span>
    </Box>
  );
}
