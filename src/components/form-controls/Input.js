import React from 'react';
import { CloseButton, Form } from 'react-bootstrap';

function Input(props) {
    const { isMandatory, remove, index } = props;

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                    {props.label}
                    <span className="text-danger" hidden={!isMandatory}>
                        *
                    </span>
                    {remove && (
                        <span
                            onClick={() => remove(index)}
                            className="text-danger ms-4"
                        >
                            <CloseButton variant="danger" />
                        </span>
                    )}
                </Form.Label>
                <Form.Control {...props} />
                <Form.Text className="text-danger">
                    {props.error ? props.error : ''}
                </Form.Text>
            </Form.Group>
        </>
    );
}

export default Input;
