import { TextField, Link, Typography, Container, Box } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { SubmitHandler, useForm } from "react-hook-form";
import { Credentials } from "../../../types";
import { useFetcher } from "../../../hooks/axios/useFetcher";

export default function SignUp() {
  const signin = useSignIn();
  const { authFetcher } = useFetcher();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Credentials>({ mode: "onBlur" });
  const navigate = useNavigate();

  const goNext = () => {
    navigate("/");
  };

  const FetchData: SubmitHandler<Credentials> = useCallback(
    async (signinData: Credentials) => {
      try {
        const data = {
          nickName: signinData.nickName,
          password: signinData.password,
        };

        const res = await authFetcher.post("/auth/signin", data);
        if (res.status === 200) {
          if (
            signin({
              token: res.data.token,
              expiresIn: 1440,
              tokenType: "Bearer",
              authState: { nickName: signinData.nickName },
            })
          ) {
            goNext();
            reset();
          }
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          alert(
            "Conflict: The user doesn't exist or incorrect login or password"
          );
        } else {
          alert("Forbidden: Access to the resource is denied");
        }
      }
    },
    [reset, signin, goNext]
  );

  return (
    <Container>
      <Box
        sx={{
          width: "30%",
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
            Sign In
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
          Have not registered yet <Link href="/auth/register">register?</Link>
        </Typography>
      </Box>
    </Container>
  );
}
