import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import FeelingForm from '../FeelingForm/FeelingForm'
import UnderstandForm from '../UnderstandingForm/UnderstandingForm'
import SupportedForm from '../SupportedForm/SupportedForm'
import CommentForm from '../CommentForm/CommentForm'
import ConfirmationSubmit from '../ConfirmationSubmit/ConfirmationSubmit'


class App extends Component {

  state = {
    currentForm: {
      date: '',
    }
  }

  componentDidMount() {
    this.getFeedback();
    // this.props.dispatch ({type: 'CURRENT_COMMENTS' , payload: 'comments here'})
  }

  getFeedback = () => {
    // tell axios to make a get call, then dispatch the array results
    axios.get ('/feedback').then( (response) => {
      console.log (`get feedback`, response.data);
      // dispatch Array results for local access
      this.props.dispatch ({type: 'GET_FEEDBACK' , payload: response.data })
      // console.log (`From REDUX`, ...this.props.reduxState.getFeedback);
      this.getDate();
    }).catch ( (err ) => {
      console.log (`Error in Get`, err);
    })
  }

  getDate = () => {
    let today = new Date();
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    this.setState({
      currentForm: {
        date: date,
      }
    })
    return 
  }
  

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
          </ul>
        </nav>
          <Route exact path="/FeelingForm" component={FeelingForm} />
          <Route exact path="/UnderstandingForm" component={UnderstandForm} />
          <Route exact path="/SupportedForm" component={SupportedForm} />
          <Route exact path="/CommentForm" component={CommentForm} />
          <Route exact path="/ConfirmationSubmit" component={ConfirmationSubmit} />
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
