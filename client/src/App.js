import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './auth/Register'
import Login from './auth/Login'
import AddParkCommentForm from './components/forms/AddParkCommentForm'
import RecommendationAdd from './components/forms/RecommendationAdd'
import RegionSelect from './components/regions/RegionSelect'
import RegionEurope from './components/regions/RegionEurope'
// import ParkShow from './components/parks/ParkShow'
import UserProfile from './auth/UserProfile'
import EditRecommendation from './components/forms/EditRecommendation'
import EditComment from './components/forms/EditComment'
import UserData from './components/parks/UserData'
import EditUserProfile from './components/forms/EditUserProfile'
import Footer from './components/Footer'
import DonationForm from './components/forms/DonationForm'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
      	  <Home />
        </Route>
        <Route  path="/register">
      	  <Register />
        </Route>
        <Route  path="/login">
      	  <Login />
        </Route>
        <Route  exact path="/profile/:id">
      	  <UserProfile />
        </Route>
        <Route  path="/profile/:id/:username">
      	  <EditUserProfile />
        </Route>
        <Route exact path="/addComments/:id">
      	  <AddParkCommentForm />
        </Route>
        <Route exact path="/parks/:id/comments/:commentId">
          <EditComment/>
        </Route>
        <Route exact path="/parks/:id/recommendations/:recommendationId">
          <EditRecommendation/>
        </Route>
        <Route path="/addRecommendation/:id">
          <RecommendationAdd/>
        </Route>
        <Route exact path="/regions">
          <RegionSelect />
        </Route>
        <Route exact path="/regions/:region">
          <RegionEurope />
        </Route>
        <Route path="/parks/:id">
          <UserData/>
        </Route>
        <Route path="/donate">
          <DonationForm />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App