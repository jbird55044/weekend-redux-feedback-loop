import React, { Component } from 'react';
import axios from 'axios';
import './UnderstandingForm.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class UnderstandingForm extends Component {

  state = {
    currentForm: {
      understanding: 0,
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
  }
  

  nextForm = () => {
    this.props.dispatch ({type: 'CURRENT_UNDERSTANDING' , payload: this.state.currentForm.understanding })
    this.props.history.push('/SupportedForm')
  }
  
  render() {


    return (
      <div className="App">
        
        <label>How are you Understanding Today?</label>
        <input type="number" min="1" max="5" value={this.state.currentForm.understanding} onChange={this.handleChangeFor}/>
        
        
        <button onClick={this.nextForm}>Next</button>
       
      </div>
      
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(UnderstandingForm); 
// export default App;