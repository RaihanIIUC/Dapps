import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import MyNetwork from "./components/MyNetwork";
 
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/my-network">
            <Header />
            <MyNetwork />
          </Route>
        </Switch>
      </Router>yar
    </div>
  );
}

export default App;
