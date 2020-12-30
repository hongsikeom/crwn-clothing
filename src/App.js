import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';


import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';



class App extends React.Component {
  // It will be used as a funcion dynamically
  unsubscribeFromAuth = null;

  // When page is fully loaded
  componentDidMount() {
    const { setCurrentUser } = this.props;

    // Adds an observer for changes to the user's sign-in status
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // If user exists
      if (userAuth) {
        // Get user data
        const uesrRef = await createUserProfileDocument(userAuth);

        // Use snapshot to get data from user
        uesrRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      } else {
        // If user doesn't exsit, empty
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser
              ? (<Redirect to='/' />)
              : (<SignInAndSignUpPage />)}
          />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
