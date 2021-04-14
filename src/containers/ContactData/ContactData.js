import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../axios';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class ContactData extends Component {
    state = {
        employeeForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            image: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    placeholder: 'Upload image'
                },
                value: '',
                base64: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    employeeHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.employeeForm) {
            if (formElementIdentifier === 'image') {
                formData[formElementIdentifier] = this.state.employeeForm[formElementIdentifier].base64;    
            }
            else {
                formData[formElementIdentifier] = this.state.employeeForm[formElementIdentifier].value;
            }
        }
        const employee = {
            employeeData: formData,
            userId: this.props.userId
        }

        this.props.onAddEmployee(employee, this.props.token);
        this.props.history.push('/employees');
        
    }

    updateEmployeeForm = (updatedFormElement, inputIdentifier) => {
        const updatedEmployeeForm = updateObject(this.state.employeeForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedEmployeeForm) {
            formIsValid = updatedEmployeeForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({employeeForm: updatedEmployeeForm, formIsValid: formIsValid});
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let updatedFormElement = {};
        event.persist();
        if (inputIdentifier === 'image') {
            let file = event.target.files[0];
            let base64 = '';
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                base64 = fileReader.result;
                updatedFormElement = updateObject(this.state.employeeForm[inputIdentifier], {
                    value: event.target.value,
                    valid: file !== null,
                    base64: base64,
                    touched: true
                });
                this.updateEmployeeForm(updatedFormElement, inputIdentifier);
            }
        }
        else {
            updatedFormElement = updateObject(this.state.employeeForm[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.employeeForm[inputIdentifier].validation),
                touched: true
            });
            this.updateEmployeeForm(updatedFormElement, inputIdentifier);
        }
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.employeeForm) {
            formElementsArray.push({
                id: key,
                config: this.state.employeeForm[key]
            });
        }
        let form = (
            <form onSubmit={this.employeeHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ADD</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.employee.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddEmployee: (employeeData, token) => dispatch(actions.addEmployee(employeeData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));