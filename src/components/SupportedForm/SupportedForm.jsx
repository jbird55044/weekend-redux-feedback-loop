import React, { Component } from 'react';
import axios from 'axios';
import './SupportedForm.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class SupportedForm extends Component {

  state = {
    currentForm: {
      supported: 0,
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
    this.props.dispatch ({type: 'CURRENT_SUPPORTED' , payload: this.state.currentForm.supported })
    this.props.history.push('/CommentForm')
  }
  
  render() {


    return (
      <div className="App">
        
        <label>How are you Supported Today?</label>
        <input type="number" min="1" max="5" value={this.state.currentForm.supported} onChange={this.handleChangeFor}/>
        
        
        <button onClick={this.nextForm}>Next</button>
       
      </div>
      
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(SupportedForm); 
// export default App;
