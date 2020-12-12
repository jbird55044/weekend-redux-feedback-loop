import React, { Component } from 'react';
import axios from 'axios';
import './ConfirmationSubmit.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class ConfirmationSubmit extends Component {

  state = {
    currentForm: {
      comment: '',
    }
  }
  
  componentDidMount() {
    // do something if necessary
  }
  
  handleChangeFor = (propertyName='comment') => (event) => {
    this.setState({
        currentForm:{
            [propertyName]: event.target.value
        }
    });
  }
  

  nextForm = () => {
      // TODO - Submit Logic to db
      // TODO - erase store  this.props.dispatch ({type: 'CURRENT_DELETE')
      console.log ('Submit Logic Here')
  }

  goBackToForm = (formName) => {
    this.props.history.push(formName)
  }

  
  render() {


    return (
      <div className="App">
        
        <p>Here are your responses, please confirm and submit </p>
        <ul>
            <li>
                Feeling: {this.props.reduxState.currentFeeling} 
                <button onClick={(event)=>this.goBackToForm('/FeelingForm')}>edit</button>
            </li>
            <li>
                Understanding: {this.props.reduxState.currentUnderstanding}
                <button onClick={(event)=>this.goBackToForm('/UnderstandingForm')}>edit</button>
            </li>
            <li>Supported: {this.props.reduxState.currentSupported}
                <button onClick={(event)=>this.goBackToForm('/SupportedForm')}>edit</button>
            </li>
            <li>
                Comment: {this.props.reduxState.currentComment}</li>
                <button onClick={(event)=>this.goBackToForm('/CommentForm')}>edit</button>

        </ul>
        
        
        <button onClick={this.nextForm}>Submit</button>
       
      </div>
      
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(ConfirmationSubmit); 
// export default App;
