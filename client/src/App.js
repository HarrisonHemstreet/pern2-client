import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import CarDetailPage from "./routes/CarDetailPage";
import {CarsContextProvider} from "./context/CarsContext";
import './App.css';

const App = () => {
  return (
      <CarsContextProvider>
          <div className="background-eggshell">
                <h1>Car Reviewer</h1>
            <div className="container">
                <Router>
                    <Switch> 
                        <Route exact path= "/" component={Home}/>
                        <Route exact path= "/cars/:id/update" component={UpdatePage}/>
                        <Route exact path= "/cars/:id" component={CarDetailPage}/>
                    </Switch> 
                </Router>
            </div>
          </div>
      </CarsContextProvider>
      );
};

export default App;
