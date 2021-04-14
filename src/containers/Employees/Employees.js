import React, { Component } from 'react';
import { connect } from 'react-redux';

import Employee from '../../components/Employee/Employee';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Employees extends Component {

    componentDidMount() {
        this.props.onFetchEmployees(this.props.token, this.props.userId);
    }

    render() {
        let employees = <Spinner />;
        if (!this.props.loading) {
            employees = this.props.employees.map(employee => (
                <Employee
                    key={employee.id}
                    name={employee.employeeData.name}
                    image={employee.employeeData.image}
                    email={employee.employeeData.email} />
            ))
        }
        return (
            <div>
                {employees}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employee.Employees,
        loading: state.employee.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEmployees: (token, userId) => dispatch(actions.fetchEmployees(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Employees, axios));