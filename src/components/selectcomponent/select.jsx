import React from 'react';
import MultiSelect from 'multiselect-react-dropdown';
import './select.scss';

const SelectControl = ({ setFieldValue, options, timOptions, ...item }) => {
    return (
        <MultiSelect
            isObject={true}
            displayValue="display_name"
            options={options}
            //selectedValues={selectedval}
            showArrow
            showCheckbox
            onRemove={(data) => {
                setFieldValue(`${item.name}`, data);
            }}
            onSelect={(data) => {
                setFieldValue(`${item.name}`, data);
            }}
        ></MultiSelect>
    );
};

export default SelectControl;
