import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

const Login = lazy(() => import("./Pages/Login"));
const Registeration = lazy(() => import("./Pages/Registeration"));
const Admin = lazy(() => import("./Pages/Admin"));
const Home = lazy(() => import("./Pages/Home"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute authRequired={false}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Registeration />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute authRequired={false}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute authRequired={true} role={"user"}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute authRequired={true} role={"admin"}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Admin />
                </Suspense>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
