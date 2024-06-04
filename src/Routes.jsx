import { Routes, Route, Outlet } from "react-router-dom";
import { Main } from "./pages/Main";
import { MyPlayList } from "./pages/MyPlayList";
import { NotFound } from "./pages";
import { Category } from "./pages/Category";
import { ProtectRoute } from "./components/protectedRoute/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { PageLayout } from "./components/pageLayout/PageLayout";

export const AppRoutes = ({ isLoginMode }) => {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registr" element={<Register isLoginMode={isLoginMode} />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectRoute isAlloved={Boolean(user)} />}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/playList" element={<MyPlayList />} />
          <Route path="/category/:id" element={<Category />} />
        </Route>
      </Route>
    </Routes>
  );
};
