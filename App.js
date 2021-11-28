import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import "./App.css";
import FormPage from "./Pages/FormPage";
import ProfilePage from "./Pages/ProfilePage";
import ForgotPage from './Pages/ForgotPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <FormPage />
        </Route>
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route path = '/forgot' >
          <ForgotPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
