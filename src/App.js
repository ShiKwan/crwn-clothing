import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.action';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />) } />
            <Route exact path='/checkout' component={CheckoutPage} />z
            <Route exact path='/' component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
