import React from 'react';

import classes from './Employee.css';

const employee = ( props ) => {

    const employeeOutput = (value) => {
        return (<span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}>{value}</span>);
    };

    return (
        <div className={classes.Employee}>
            <img src={props.image} alt='default' height='100' width='80' />
            <p>Name: {employeeOutput(props.name)}</p>
            <p>E Mail: <strong>{props.email}</strong></p>
        </div>
    );
};

export default employee;