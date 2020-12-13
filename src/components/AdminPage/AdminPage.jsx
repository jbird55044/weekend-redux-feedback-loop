import React, { Component } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import AdminPageItem from '../AdminPageItem/AdminPageItem'


class AdminPage extends Component {

    componentDidMount() {
        this.getFeedback();
    }

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

    
  render() {
    return (
      <div className="App">
       <h3>Admin Page</h3>
       <table>
           <thead>
                <tr>
                    <th>Feeling</th><th>Understanding</th><th>Supported</th><th>Comment</th><th>Date</th><th>Delete</th>
                </tr>
           </thead>
           <tbody>
                        {this.props.reduxState.getFeedback.map((feedback, index) => {
                        return <AdminPageItem key={index} feedback={feedback} />;
                        })}
           </tbody>
       </table>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(AdminPage); 
// export default App;
