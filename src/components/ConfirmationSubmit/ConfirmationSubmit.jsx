import React, { Component } from 'react';
import axios from 'axios';
import './ConfirmationSubmit.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import EditIcon from '@material-ui/icons/Edit';


//button and input management for Material-UI
const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
    button: {
        margin: theme.spacing.unit,
     },
     leftIcon: {
     marginRight: theme.spacing.unit,
     },
     rightIcon: {
     marginLeft: theme.spacing.unit,
     },
     iconSmall: {
     fontSize: 20,
     },
  });


class ConfirmationSubmit extends Component {

    // stage state data for all user input to allow for easy PUT to db
  state = {
    databasePayload: {
      feeling: this.props.reduxState.currentFeeling,
      understanding: this.props.reduxState.currentUnderstanding,
      support: this.props.reduxState.currentSupported,
      comments: this.props.reduxState.currentComments,
      flagged: false,
      date: '12/14/2020'
    },
    dense:false,
    secondary: false,
  }
  
  componentDidMount() {
    this.populateCurrentDate()
  }

  // set date to look human like and load into db
  populateCurrentDate = () => {
    let today = new Date();
    let dateString = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    this.setState({
        databasePayload:{
            date: dateString
        }
    });
    console.log (`date via state:`, this.state.databasePayload);
    console.log (`date via string:`, dateString);
  }
  
  handleChangeFor = (propertyName='comment') => (event) => {
    this.setState({
        currentForm:{
            [propertyName]: event.target.value
        }
    });
  }
  
  // set local state data to db upon user 'submit'
  commitToDatabase = () => {
    // this.populateCurrentDate()
    axios.post('/feedback', this.state.databasePayload)
    .then((response) => {
        console.log ('Added DB Payload', response.data)
        this.props.dispatch ({type: 'CURRENT_DELETE'})
        alert ('thank you or your feedback')
        this.goBackToForm('/Home')
    }).catch ( (err ) => {
        console.log (`Error in Get`, err);
    });
  }

  goBackToForm = (formName) => {
    this.props.history.push(formName)
  }

  
  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className="App">
        
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            <div className={classes.demo}>
            <h3>Here are your responses, please confirm, edit or submit </h3>
              <List dense={dense}>
                  <ListItem>
                    <ListItemIcon> <DoubleArrowIcon /> </ListItemIcon>
                    <ListItemText primary = {`Feeling: ${this.props.reduxState.currentFeeling}`}/>
                    <Button size="small" variant="outlined" color="primary" className={classes.button} onClick={(event)=>this.goBackToForm('/FeelingForm')}>
                        <EditIcon className={classes.leftIcon}></EditIcon>Edit
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon> <DoubleArrowIcon /> </ListItemIcon>
                    <ListItemText primary = {`Understanding: ${this.props.reduxState.currentUnderstanding}`}/>
                    <Button size="small" variant="outlined" color="primary" className={classes.button} onClick={(event)=>this.goBackToForm('/UnderstandingForm')}>
                        <EditIcon className={classes.leftIcon}></EditIcon>Edit
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon> <DoubleArrowIcon /> </ListItemIcon>
                    <ListItemText primary = {`Supported: ${this.props.reduxState.currentSupported}`}/>
                    <Button size="small" variant="outlined" color="primary" className={classes.button} onClick={(event)=>this.goBackToForm('/SupportedForm')}>
                        <EditIcon className={classes.leftIcon}></EditIcon>Edit
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon> <DoubleArrowIcon /> </ListItemIcon>
                    <ListItemText primary = {`Comment: ${this.props.reduxState.currentComments}`}/>
                    <Button size="small" variant="outlined" color="primary" className={classes.button} onClick={(event)=>this.goBackToForm('/CommentForm')}>
                        <EditIcon className={classes.leftIcon}></EditIcon>Edit
                    </Button>
                  </ListItem>
              </List>
            </div>
        </Grid>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.commitToDatabase}>
            Submit<NavigateNextIcon className={classes.rightIcon}></NavigateNextIcon>
        </Button>
      </div>
    );
  }
}

ConfirmationSubmit.propTypes = {
    classes: PropTypes.object.isRequired,
};


const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps) (withStyles(styles) (ConfirmationSubmit)) ; 
