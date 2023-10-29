import {
  TextField,
  Button,
  Link,
  Typography,
  Container,
  Box,
} from "@mui/material";

export default function SignUp() {
  return (
    <Container maxWidth="tablet">
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          backgroundColor: "#303030",
          boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
          padding: "40px 55px 45px 55px",
          borderRadius: "15px",
          transition: "all 0.3s",
        }}
      >
        <Typography variant="h3" align="center" sx={{ paddingBottom: "20px" }}>
          Sign In
        </Typography>

        <TextField
          label="Email address or Nickname"
          fullWidth
          variant="outlined"
          type="email"
          placeholder="Enter email or Nickname"
          sx={{ marginBottom: "10px" }}
        />

        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Enter password"
          sx={{ marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          type="submit"
          size="large"
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          Sign In
        </Button>

        <Typography
          variant="body2"
          align="right"
          sx={{
            fontSize: "13px",
            paddingTop: "10px",
            color: "#7f7d7d",
            margin: "0",
          }}
        >
          Have not registered yet <Link href="/signup">sign up?</Link>
        </Typography>
      </Box>
    </Container>
  );
}
