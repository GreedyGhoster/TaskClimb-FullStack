import { TextField, Link, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export type Data = {
  nickName: string;
  password: string;
};

export default function Register() {
  const registration = useSignIn();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Data>({ mode: "onBlur" });

  const navigate = useNavigate();

  const goNext = () => navigate("/");

  const FetchData: SubmitHandler<Data> = useCallback(
    async (registerData: Data) => {
      try {
        const res = await axios.post("/api/auth/register", {
          nickName: registerData.nickName,
          password: registerData.password,
        });
        if (res.status === 200) {
          if (
            registration({
              token: res.data.token,
              expiresIn: 1440,
              tokenType: "Bearer",
            })
          ) {
            goNext();
            reset();
          }
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          alert("Conflict: The user already exists");
        } else {
          alert("Forbidden: Access to the resource is denied");
        }
      }
    },
    [reset, registration, goNext]
  );

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

        <Box component={"form"} onSubmit={handleSubmit(FetchData)}>
          <TextField
            label="Nickname"
            {...register("nickName", {
              required: "The field must be filled in",
              minLength: {
                value: 5,
                message: "Minimum of 5 characters",
              },
            })}
            fullWidth
            variant="outlined"
            placeholder="Nickname"
            type="text"
            error={!!errors.nickName}
          />
          <div style={{ color: "#f44336", height: "32px" }}>
            {errors.nickName && <span>{errors.nickName.message}</span>}
          </div>

          <TextField
            label="Password"
            {...register("password", {
              required: "The field must be filled in",
              minLength: {
                value: 8,
                message: "Minimum of 8 characters",
              },
            })}
            fullWidth
            variant="outlined"
            type="password"
            placeholder="Enter password"
            error={!!errors.password}
          />
          <div style={{ color: "#f44336", height: "20px" }}>
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <TextField
            variant="outlined"
            disabled={!isValid}
            type="submit"
            fullWidth
            sx={{ marginBottom: "20px", marginTop: "15px" }}
          >
            Register
          </TextField>
        </Box>

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
