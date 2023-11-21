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
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export default function Register() {
  const register = useSignIn();

  const [registerData, setRegisterData] = useState({
    nickName: "",
    password: "",
  });

  const URL = "http://localhost:4580/auth/register";

  const data = {
    nickName: registerData.nickName,
    password: registerData.password,
  };

  const navigate = useNavigate();

  const goNext = () => navigate("/");

  const FetchData = async () => {
    setRegisterData({ nickName: "", password: "" });

    return axios.post(URL, data).then((res) => {
      if (res.status === 200) {
        if (
          register({
            token: res.data.token,
            expiresIn: 1440,
            tokenType: "Bearer",
            authState: registerData,
          })
        ) {
          goNext();
        } else {
          alert("The user already exists");
        }
      }
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
          Register
        </Typography>

        <TextField
          label="Nickname"
          value={registerData.nickName}
          onChange={(e) =>
            setRegisterData({ ...registerData, nickName: e.target.value })
          }
          fullWidth
          variant="outlined"
          placeholder="Nickname"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="Password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
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
          Register
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
