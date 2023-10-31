import {
  TextField,
  Button,
  Link,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useTodo } from "../../hooks";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const { getToken, token } = useTodo();

  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const URL = "http://localhost:4580/auth/signin";

  const data = {
    nickName: nickName,
    password: password,
  };

  const FetchData = () => {
    axios
      .post(URL, data)
      .then((res) => {
        getToken(res.data);
        console.log(token);
      })
      .catch(() => {
        alert("The user does not exist or Password is incorrect");
      });
    setNickName("");
    setPassword("");
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
          Sign In
        </Typography>

        <TextField
          label="Nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          fullWidth
          variant="outlined"
          type="email"
          placeholder="Nickname"
          sx={{ marginBottom: "10px" }}
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
          Have not registered yet <Link href="/auth/signup">sign up?</Link>
        </Typography>
      </Box>
    </Container>
  );
}
