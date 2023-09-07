import { Route, Routes } from "react-router";
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Profile from '../Profile/Profile'
import routes from "./routes.json";
const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Signup />} />
        <Route path={routes.HOME} element={<Signup />} />
        <Route path={routes.SIGNUP} element={<Signup />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.PROFILE} element={<Profile />} />

      </Routes>
    </>
  );
};
export default PageRoutes;