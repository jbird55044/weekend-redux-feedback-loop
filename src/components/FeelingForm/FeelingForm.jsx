import React, { Component } from 'react';
import axios from 'axios';
import './FeelingForm.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class FeelingForm extends Component {

  state = {
    currentForm: {
      feeling: this.props.reduxState.currentFeeling,
    }
  }
  
  componentDidMount() {
    // do something if necessary
  }
  
  handleChangeFor = (propertyName='feeling') => (event) => {
    this.setState({
        currentForm:{
            [propertyName]: event.target.value
        }
    });
    console.log ('feeling state:', this.state.currentForm.feeling)
  }
  

  nextForm = () => {
      if (this.state.currentForm.feeling === 0) 
        alert (' Value needs to be between 1 and 5')
      else {
        this.props.dispatch ({type: 'CURRENT_FEELING' , payload: this.state.currentForm.feeling })
        this.props.history.push('/UnderstandingForm')
      }
  }
  
  render() {


    return (
      <div className="App">
        
        <label>How are you Feeling Today?</label>
        <input type="number" min="1" max="5" value={this.state.currentForm.feeling} onChange={this.handleChangeFor('feeling')}/>
        
        
        <button onClick={this.nextForm}>Next</button>
       
      </div>
      
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(FeelingForm); 
// export default App;
