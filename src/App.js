import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import AddEmployee from './components/AddEmployee/AddEmployee';
import Home from './components/Home/Home';
import SendEmail from './components/Home/SendEmail';

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/employeeAdd">
            <AddEmployee/>
          </Route>
          <Route path="/sendEmail">
            <SendEmail/>
          </Route>
          </Switch>
    </BrowserRouter>
  );
};

export default App;
