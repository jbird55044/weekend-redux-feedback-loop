import React, { Component } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import AdminPageItem from '../AdminPageItem/AdminPageItem'


class AdminPage extends Component {

    
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
