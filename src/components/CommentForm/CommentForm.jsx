import React, { Component } from 'react';
import axios from 'axios';
import './CommentForm.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class CommentForm extends Component {

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
    this.props.dispatch ({type: 'CURRENT_COMMENT' , payload: this.state.currentForm.comment })
    this.props.history.push('/ConfirmationSubmit')
  }
  
  render() {


    return (
      <div className="App">
        
        <label>Please enter a comment as you see fit . . . </label>
        <input type="text" value={this.state.currentForm.comment} onChange={this.handleChangeFor('comment')}/>
        
        
        <button onClick={this.nextForm}>Next</button>
       
      </div>
      
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CommentForm); 
// export default App;
