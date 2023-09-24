import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./Components/Layout";
import "./Sass/App.scss";

// Pages
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import GroupPage from "./Pages/GroupPage";
import { UserProvider, useUser } from "./Contexts/userContext";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ProctectRoutes from "./Components/ProctectRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <UserProvider>
          <Toaster />
          <Layout>
            <ProctectRoutes>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/group/:id" element={<GroupPage />} />
              </Routes>
            </ProctectRoutes>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </Provider>
  );
}

export default App;
