import Home from "./pages/Home";
import NotFound from "./pages/_404";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserContext from "./context/UserContext";
import Welcome from "./pages/Dashboard/Welcome";
import Activities from "./pages/Dashboard/Activities";
import Plots from "./pages/Dashboard/Plots";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./context/PrivateRoute";
import { useEffect, useMemo, useState } from "react";
import { IsLogged } from "./context/IsLogged";
import { IUserContext } from "./interfaces/user.interface";

function App() {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("auth");
    if (loggedUserJSON) {
      const auth = JSON.parse(loggedUserJSON);
      setAuth(auth);
    }
  }, []);

  const [auth, setAuth] = useState<IUserContext["auth"]>();
  const [search, setSearch] = useState<string>("");
  const value = useMemo(
    () => ({ auth, setAuth, search, setSearch }),
    [auth, setAuth, search, setSearch]
  );

  return (
    <main>
      <BrowserRouter>
        <UserContext.Provider value={value as IUserContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<IsLogged />}>
              <Route path="" element={<Login />} />
            </Route>
            <Route path="/signup" element={<IsLogged />}>
              <Route path="" element={<Signup />} />
            </Route>

            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route
                path=""
                element={
                  <Dashboard>
                    <Welcome />
                  </Dashboard>
                }
              />
              <Route
                path="/dashboard/activities"
                element={
                  <Dashboard>
                    <Activities />
                  </Dashboard>
                }
              />
              <Route
                path="/dashboard/plots"
                element={
                  <Dashboard>
                    <Plots />
                  </Dashboard>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </main>
  );
}

export default App;
