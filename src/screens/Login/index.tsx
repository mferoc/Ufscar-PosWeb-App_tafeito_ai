import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import { CustomizedCardHeader } from "./styles";
import { useNavigate } from "react-router-dom";

import { ErrorResponse } from "../../utils/model/ErrorResponse";
import { useAuth } from "../../provider/authProvider";
import { api } from "../../provider/customAxiosProvider";
import { url_login } from "../../utils/api";
import { AxiosError } from "axios";

const Login = () => {
  const { token, setToken } = useAuth();

  const [isButtonActive, setIsButtonActive] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      navigate("/tarefas", { replace: true });
    }
  }, [token]);

  useEffect(() => {
    if (
      username !== null &&
      username !== "" &&
      password !== null &&
      password !== ""
    ) {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }
  }, [username, password]);

  const postLogin = async () => {
    const payload = {
      login: username,
      senha: password,
    };

    setErrorMessage("");

    try {
      const dataResponse = await api.post(url_login, payload);

      if (dataResponse.status === 200 && dataResponse?.data?.token) {
        setToken(dataResponse?.data?.token);
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      const errorResponse: ErrorResponse = {
        status: axiosError?.response?.status,
        data: axiosError?.response?.data,
      };

      if (errorResponse?.status === 422 && errorResponse?.data?.mensagem) {
        setErrorMessage(errorResponse?.data?.mensagem);
      } else if (errorResponse?.status === 400) {
        setErrorMessage("Requisição inválida!");
      } else {
        setErrorMessage("Erro no servidor, tente novamente em alguns minutos!");
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 480 }}>
        <CustomizedCardHeader
          title="Tafeito"
          subheader="Transforme suas tarefas em ações"
        />
        <CardContent>
          <Box py={1}>
            <TextField
              onChange={(newValue) => {
                setUsername(newValue.target.value);
              }}
              fullWidth
              id="username"
              label="Usuário"
              variant="filled"
            />
          </Box>
          <Box py={1}>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                onChange={(newValue) => {
                  setPassword(newValue.target.value);
                }}
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Box width={"100%"}>
              {errorMessage && (
                <Typography color={"red"}>{errorMessage}</Typography>
              )}
            </Box>
            <Box width={"100%"}>
              <Button
                sx={{
                  width: "100%",
                }}
                onClick={() => {
                  postLogin();
                }}
                disabled={isButtonActive}
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
