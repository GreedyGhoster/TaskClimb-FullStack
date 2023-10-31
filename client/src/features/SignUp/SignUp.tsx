import {
  TextField,
  Button,
  Link,
  Typography,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useTodo } from "../../hooks";

export default function SignUp() {
  const { getToken } = useTodo();

  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const URL = "http://localhost:4580/auth/signup";

  const data = {
    nickName: nickName,
    password: password,
  };

  const FetchData = async () => {
    setNickName("");
    setPassword("");
    return axios
      .post(URL, data)
      .then((res) => {
        getToken(res.data);
      })
      .catch(() => {
        alert("The user already exists");
      });
  };

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
          Sign Up
        </Typography>

        <TextField
          label="Nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nickname"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={() => FetchData()}
        >
          Sign Up
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
          Already registered <Link href="/auth/signin">sign in?</Link>
        </Typography>
      </Box>
    </Container>
  );
}
