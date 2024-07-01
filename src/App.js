import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/Registration/RegistrationPage";
import { Provider } from "react-redux";
import store from "./Redux/store";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path="Registration-page/:service/:engine_no"
              element={<RegistrationPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
