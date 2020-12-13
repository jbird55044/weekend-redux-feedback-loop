import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class AdminPageItem extends Component {

    formatSqlDate = (passedDate) => {
        let year = passedDate.slice(0, 4);
        let month = passedDate.slice(5, 7);
        let day = passedDate.slice(8, 10);
        return `${month}/${day}/${year}`
    };
    
    // duplicate getFeedback from App.  I believe if I knew about REDUX HOOKS, I would
    // be able to remediate that.  Until then, I added a second get to solve for
    // DOM refresh.
    getFeedback = () => {
        // tell axios to make a get call, then dispatch the array results
        // used for future expansion of application
        axios.get ('/feedback').then( (response) => {
          console.log (`GETting feedback response`, response.data);
          this.props.dispatch ({type: 'GET_FEEDBACK' , payload: response.data })
          this.getDate();
          console.log (`Feedback from reduxState`, this.props.reduxState.getFeedback);
        }).catch ( (err ) => {
          console.log (`Error in Get`, err);
        })
      }

    deleteFeedback = ( event, feedbackId ) => {
        console.log (`delete ID`, feedbackId);
        axios.delete (`/feedback/${feedbackId}`)
        .then ((response) => {
            console.log ('Response on Delete', response);
            this.getFeedback();
          }).catch ( (err ) => {
            console.log (`Error in Get`, err);
            alert ('Error in Delete');
          })
      } // end of deleteTodo fn
    

  render() {
    return (
        <><tr>
            <td>{this.props.feedback.feeling}</td>
            <td>{this.props.feedback.understanding}</td>
            <td>{this.props.feedback.support}</td>
            <td>{this.props.feedback.comments}</td>
            <td>{this.formatSqlDate(this.props.feedback.date)}</td>
            <td><button onClick={(event)=>this.deleteFeedback(event, this.props.feedback.id)}>Delete</button></td>
        </tr>
        </>
    );
    }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(AdminPageItem); 
// export default App;
