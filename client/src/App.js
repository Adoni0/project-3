import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
import Home from './pages/Home';
import TripPlan from './pages/TripPlan';
import NoMatch from "./pages/NoMatch";

import './App.css';


class App extends Component {

  state = {
    userId: '1', // This Id is temp
    allTrips: []
  }

  loadTrips = () => {
    const userId = this.state.userId;
    API.getAllTrips(userId)
      .then(res => {
        console.log(res.data);
        this.setState({ allTrips: res.data.trips });
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props}
              userId={this.state.userId}
              loadTrips={this.loadTrips}
              allTrips={this.state.allTrips} />}
            />

            <Route
              exact
              path="/trip-plans"
              component={TripPlan}
            />

            <Route
              exact
              path="/trip-plans/:id"
              component={TripPlan}
            />

            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    )
  }
}

export default App;
