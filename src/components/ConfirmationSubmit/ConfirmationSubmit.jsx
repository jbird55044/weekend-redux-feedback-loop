import React, { Component } from 'react';
import axios from 'axios';
import './ConfirmationSubmit.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class ConfirmationSubmit extends Component {

  state = {
    databasePayload: {
      feeling: this.props.reduxState.currentFeeling,
      understanding: this.props.reduxState.currentUnderstanding,
      support: this.props.reduxState.currentSupported,
      comments: this.props.reduxState.currentComments,
      flagged: false,
      date: '12/12/2020'
    }
  }
  
  componentDidMount() {
    // do something if necessary
  }

  populateCurrentDate = () => {
    let today = new Date();
    let dateString = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    this.setState({
        databasePayload: {
            date: dateString,
        }
    });
    console.log (`date via state:`, this.state.databasePayload);
    console.log (`date:`, dateString);
  }
  
  handleChangeFor = (propertyName='comment') => (event) => {
    this.setState({
        currentForm:{
            [propertyName]: event.target.value
        }
    });
  }
  

  commitToDatabase = () => {
    this.populateCurrentDate()
    axios.post('/feedback', this.state.databasePayload)
    .then((response) => {
        console.log ('Added DB Payload', response.data)
        this.props.dispatch ({type: 'CURRENT_DELETE'})
        alert ('thank you or your feedback')
        this.goBackToForm('/Home')
    });
    
      // TODO - erase store  
      console.log ('Submit Logic Here')
  }

  goBackToForm = (formName) => {
    this.props.history.push(formName)
  }

  
  render() {


    return (
      <div className="App">
        
        <p>Here are your responses, please confirm, edit or submit </p>
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
                Comment: {this.props.reduxState.currentComments}</li>
                <button onClick={(event)=>this.goBackToForm('/CommentForm')}>edit</button>

        </ul>
        
        
        <button onClick={this.commitToDatabase}>Submit</button>
       
      </div>
      
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(ConfirmationSubmit); 
// export default App;
