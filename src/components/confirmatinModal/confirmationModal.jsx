import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                closeButton
                closeVariant="white"
                className="bg-dark text-light"
            >
                {props.heading}
            </Modal.Header>
            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    {props.failure}
                </Button>
                <Button
                    type="submit"
                    variant="danger"
                    onClick={() => {
                        props.action();
                    }}
                >
                    {props.success}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
