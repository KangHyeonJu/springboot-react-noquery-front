import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import type { User } from "../types.js";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store.ts";
import { getAuthToken } from "../api/authapi.js";

function Login() {
  const navigate = useNavigate(); //페이지 이동
  const { login } = useAuthStore(); //login -> 로그인 상태를 전역으로 true로 바꿈
  const [user, setUser] = useState<User>({
    //입력한 username, pw 저장
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false); //Snackbar(로그인 실패 알림창) 열림 여부

  //TextField 입력창이 바뀔 때 호출
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value }); //기본 user객체 복사 후 해당 필드만 덮어씌움
  };

  //로그인 처리 함수
  const handleLogin = () => {
    getAuthToken(user) //서버에 user 보내서 토큰 받음
      .then((jwtToken) => {
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken); //토큰을 브라우저 세션(sessionStorage)에 저장 (브라우저 종료 시 사라짐).
          login(); //전역 상태 로그인 true로 변경
          navigate("/");
        }
      })
      .catch(() => setOpen(true)); //로그인 실패 -> Snackbar 열기
  };

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField name="username" label="Username" onChange={handleChange} />
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Login failed: Check your username and password"
      />
    </Stack>
  );
}

export default Login;
