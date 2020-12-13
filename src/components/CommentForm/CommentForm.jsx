import React, { Component } from 'react';
import './CommentForm.css';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//button and input management for Material-UI
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: "50%",
    },
    dense: {
      marginTop: 16,
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

class CommentForm extends Component {

  state = {
    currentForm: {
      comments: this.props.reduxState.currentComments,
    }
  }
  
  componentDidMount() {
    // do something if necessary
  }
  
  handleChangeFor = (propertyName='comments') => (event) => {
    this.setState({
        currentForm:{
            [propertyName]: event.target.value
        }
    });
  }
  

  nextForm = () => {
    this.props.dispatch ({type: 'CURRENT_COMMENT' , payload: this.state.currentForm.comments})
    this.props.history.push('/ConfirmationSubmit')
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
            id="filled-number"
            label="Please enter a comment as you see fit . . ."
            value={this.state.currentForm.comments}
            onChange={this.handleChangeFor('comments')}
            type="text"
            InputProps={{inputProps: {max: 5, min: 1}}}
            fullWidth
            className={classes.textField}
            InputLabelProps={{shrink: true,}}
            margin="normal"
            variant="filled"
            />
        </form>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.nextForm}>
            Next<NavigateNextIcon className={classes.rightIcon}></NavigateNextIcon>
        </Button>

      </div>
      
    );
  }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps) (withStyles(styles) (CommentForm)) ; 
