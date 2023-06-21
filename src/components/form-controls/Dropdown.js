import { Form } from 'react-bootstrap';
import { DropdownList } from 'react-widgets';

function Dropdown(props) {
    const { isMandatory } = props;
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                    {props.label}
                    <span className="text-danger" hidden={!isMandatory}>
                        *
                    </span>
                </Form.Label>

                <DropdownList {...props} />
                <Form.Text className="text-danger">
                    {props.error ? props.error : ''}
                </Form.Text>
            </Form.Group>
        </>
    );
}

export default Dropdown;
