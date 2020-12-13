import React, { Component } from 'react';
import './SupportedForm.css';
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

class SupportedForm extends Component {

  state = {
    currentForm: {
      supported: this.props.reduxState.currentSupported,
    }
  }
  
  componentDidMount() {
    // do something if necessary
  }
  
  handleChangeFor = (propertyName='supported') => (event) => {
    this.setState({
        currentForm:{
            [propertyName]: event.target.value
        }
    });
  }
  

  nextForm = () => {
    if (this.state.currentForm.feeling === 0) 
        alert (' Value needs to be between 1 and 5')
    else {
        this.props.dispatch ({type: 'CURRENT_SUPPORTED' , payload: this.state.currentForm.supported })
        this.props.history.push('/CommentForm')
    }
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
            id="filled-number"
            label="How are you Supported Today?"
            value={this.state.currentForm.supported}
            onChange={this.handleChangeFor('supported')}
            type="number"
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

SupportedForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps) (withStyles(styles) (SupportedForm)) ; 
