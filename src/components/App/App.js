import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux'



class App extends Component {

  componentDidMount() {
    this.getFeedback();
  }

  getFeedback = () => {
    // tell axios to make a get call, then dispatch the array results
    axios.get ('/feedback').then( (response) => {
      console.log (`get feedback`, response.data);
      // dispatch Array results for local access
      this.props.dispatch ({type: 'GET_FEEDBACK' , payload: response.data })
      console.log (`From REDUX`, this.props.reduxState.getFeedback);
      console.log (`From REDUX`, ...this.props.reduxState.getFeedback);

    }).catch ( (err ) => {
      console.log (`Error in Get`, err);
    })
  }

  getDate = () => {
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4><i>Don't forget it!</i></h4>
        </header>

        <button>Get Started with feedback for: </button>
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
