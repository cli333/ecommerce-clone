import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import Homepage from "./pages/homepage/Homepage";
import Shop from "./pages/shop/Shop";
import Checkout from "./pages/checkout/Checkout";
import Header from "./components/header/Header";
import Sign from "./components/sign/Sign";
import Collection from "./pages/collection/Collection";
import { setCurrentUser } from "./redux/user/user-action";
import { selectCurrentUser } from "./redux/user/user-selector";

class App extends Component {
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // userRef returned from the creaetUserProfileDocument
        const userRef = await createUserProfileDocument(userAuth);

        // call .data() on the snapshot to get user data
        userRef.onSnapshot(snapShot =>
          setCurrentUser({
            // user id only exists on the snapshot
            id: snapShot.id,
            // but the user data is found on snapshot.data()
            ...snapShot.data()
          })
        );
      }
      // if userAuth is null, sets currentUser to null
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={Shop} />
          <Route path={"/shop/:collectionId"} component={Collection} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/signin"
            render={
              () => (this.props.currentUser ? <Redirect to="/" /> : <Sign />) // if there's a currentUser redirect to main
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  // setCurrentUser returns user object
  // dispatch, 'dispatches' to reducers
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
