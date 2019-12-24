import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import Homepage from "./pages/homepage/Homepage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import Sign from "./components/sign/Sign";

const SecretPage = ({
  match: {
    params: { id }
  }
}) => (
  <div>
    <h1>You've found {id}'s secret page!</h1>
  </div>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubsuscribeFromAuth = null;

  componentDidMount() {
    this.unsubsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // userRef returned from the creaetUserProfileDocument
        const userRef = await createUserProfileDocument(userAuth);
        // call .data() on the snapshot to get user data
        userRef.onSnapshot(snapShot =>
          this.setState({
            currentUser: {
              // user id only exists on the snapshot
              id: snapShot.id,
              // but the user data is found on snapshot.data()
              ...snapShot.data()
            }
          })
        );
      }
      // if userAuth is null, sets currentUser to null
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={Sign} />
          <Route path="/secret/:id" component={SecretPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
