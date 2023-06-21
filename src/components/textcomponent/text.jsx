import React from 'react';
import './text.scss';
import { Field } from 'formik';

const TextControl = ({ ...item }) => {
    return (
        <Field
            type={item.type}
            name={item.name}
            id={item.id}
            readOnly={item.read}
            {...item}
            className="form-input"
        ></Field>
    );
};

export default TextControl;
