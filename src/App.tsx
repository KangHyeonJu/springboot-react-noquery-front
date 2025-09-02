import "./App.css";
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import Login from "./page/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Carlist from "./page/Carlist";
import type { JSX } from "react";
import useAuthStore from "./store";

interface PrivateRouteProps {
  children: JSX.Element; //JSX.Element: React에서 컴포넌트나 HTML 태그를 나타내는 타입
}

function PrivateRoute({ children }: PrivateRouteProps) {
  //PrivateRoute: 로그인해야만 볼 수 있는 페이지를 감싸는 컴포넌트
  const { isAuthenticated } = useAuthStore(); //로그인 여부 가져옴

  //로그인O -> children 컴포넌트 보여줌
  //로그인X -> /login으로 리다이렉트
  return isAuthenticated ? children : <Navigate to="/login" replace />; //replace옵션은 브라우저 히스토리에 '뒤로 가기' 눌렀을 때 무한 리다이렉트 막아줌
}

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Car Shop</Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Carlist />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
