import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import AppPage from '../App/App'
import FeelingForm from '../FeelingForm/FeelingForm'
import UnderstandForm from '../UnderstandingForm/UnderstandingForm'
import SupportedForm from '../SupportedForm/SupportedForm'
import CommentForm from '../CommentForm/CommentForm'
import ConfirmationSubmit from '../ConfirmationSubmit/ConfirmationSubmit'
import AdminPage from '../AdminPage/AdminPage'


class App extends Component {

  state = {
    currentForm: {
      date: '',
    }
  } 

  componentDidMount() {
    this.getFeedback();
  }

  // Populate store with db data
  getFeedback = () => {
    // tell axios to make a get call, then dispatch the array results
    // put data in local client side store for easy/fast data retrieval
    // without going back to db
    axios.get ('/feedback').then( (response) => {
      console.log (`GETting feedback response`, response.data);
      this.props.dispatch ({type: 'GET_FEEDBACK' , payload: response.data })
      this.getDate();
      console.log (`Feedback from reduxState`, this.props.reduxState.getFeedback);
    }).catch ( (err ) => {
      console.log (`Error in Get`, err);
    })
  }
  
  // get current system date for DOM
  getDate = () => {
    let today = new Date();
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    this.setState({
      currentForm: {
        date: date,
      }
    })
    return 
  }  // end of getDate fn
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4><i>Don't forget it!</i></h4>
        </header>
        <h2>Feedback for: {this.state.currentForm.date}</h2>
       
        <Router>
        <nav className='navbar'>
          <ul>
            <li><Link to="/FeelingForm">Get Started</Link></li>
            <li><Link to="/AdminPage">(Secret Admin Page)</Link></li>
          </ul>
        </nav>
          <Route exact path="/App" component={AppPage} />
          <Route exact path="/FeelingForm" component={FeelingForm} />
          <Route exact path="/UnderstandingForm" component={UnderstandForm} />
          <Route exact path="/SupportedForm" component={SupportedForm} />
          <Route exact path="/CommentForm" component={CommentForm} />
          <Route exact path="/ConfirmationSubmit" component={ConfirmationSubmit} />
          <Route exact path="/AdminPage" component={AdminPage} />
       </Router>

        <br/>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(App); 
// export default App;
