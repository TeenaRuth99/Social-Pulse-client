import React from 'react';
import './btn.scss';
import { Formik } from 'formik';

const BtnControl = ({ setSubmitBtnName }) => {
    return (
        <div className="buttonContainer">
            <button
                type="submit"
                className="btns"
                name="save"
                onClick={(e) => setSubmitBtnName(e.target.name)}
                onSubmit={Formik.onSubmit}
            >
                Populate
            </button>
        </div>
    );
};

export default BtnControl;
