import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addEmployeeSuccess = ( id, employeeData ) => {
    return {
        type: actionTypes.ADD_EMPLOYEE_SUCCESS,
        employeeId: id,
        employeeData: employeeData
    };
};

export const addEmployeeFail = ( error ) => {
    return {
        type: actionTypes.ADD_EMPLOYEE_FAIL,
        error: error
    };
}

export const addEmployeeStart = () => {
    return {
        type: actionTypes.ADD_EMPLOYEE_START
    };
};

export const addEmployee = ( employeeData, token ) => {
    return dispatch => {
        dispatch( addEmployeeStart() );
        axios.post( '/employees.json?auth=' + token, employeeData )
            .then( response => {
                dispatch( addEmployeeSuccess( response.data.name, employeeData ) );
            } )
            .catch( error => {
                dispatch( addEmployeeFail( error ) );
            } );
    };
};

export const fetchEmployeesSuccess = ( employees ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_SUCCESS,
        employees: employees
    };
};

export const fetchEmployeesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_FAIL,
        error: error
    };
};

export const fetchEmployeesStart = () => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_START
    };
};

export const fetchEmployees = (token, userId) => {
    return dispatch => {
        dispatch(fetchEmployeesStart());
        axios.get( '/employees.json?auth=' + token)
            .then( res => {
                const fetchedEmployees = [];
                for ( let key in res.data ) {
                    fetchedEmployees.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchEmployeesSuccess(fetchedEmployees));
            } )
            .catch( err => {
                dispatch(fetchEmployeesFail(err));
            } );
    };
};