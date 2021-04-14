import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    Employees: [],
    loading: false
};

const addEmployeeStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addEmployeeSuccess = ( state, action ) => {
    const newEmployee = updateObject( action.employeeData, { id: action.employeeId } );
    return updateObject( state, {
        loading: false,
        Employees: state.Employees.concat( newEmployee )
    } );
};

const addEmployeeFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchEmployeesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchEmployeesSuccess = ( state, action ) => {
    return updateObject( state, {
        Employees: action.employees,
        loading: false
    } );
};

const fetchEmployeesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_EMPLOYEE_START: return addEmployeeStart( state, action );
        case actionTypes.ADD_EMPLOYEE_SUCCESS: return addEmployeeSuccess( state, action )
        case actionTypes.ADD_EMPLOYEE_FAIL: return addEmployeeFail( state, action );
        case actionTypes.FETCH_EMPLOYEES_START: return fetchEmployeesStart( state, action );
        case actionTypes.FETCH_EMPLOYEES_SUCCESS: return fetchEmployeesSuccess( state, action );
        case actionTypes.FETCH_EMPLOYEES_FAIL: return fetchEmployeesFail( state, action );
        default: return state;
    }
};

export default reducer;