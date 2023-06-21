import React from 'react';
import { Form } from 'react-bootstrap';

function FormCheckControl(props) {
    return (
        <>
            <Form.Group>
                <Form.Label className="fw-bold">{props.label}</Form.Label>

                <div className="d-flex mt-2">
                    {props.data?.map((value) => {
                        return (
                            <Form.Check
                                {...props}
                                type='switch'
                                value={value}
                                data_val={value}
                                label={value}
                                className="me-4"
                            />
                        );
                    })}
                </div>

                <Form.Text className="text-danger">
                    {props.error ? props.error : ''}
                </Form.Text>
            </Form.Group>
        </>
    );
}

export default FormCheckControl;
