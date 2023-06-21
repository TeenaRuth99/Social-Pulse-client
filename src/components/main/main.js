import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './main.css';

function Main({ children }) {
    return (
        // <div
        //     style={{
        //         height: '93vh',
        //         width: '100%',
        //         maxHeight: '93vh',
        //         overflow: 'scroll',
        //     }}
        // >
        <Container>
            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
        //  </div>
    );
}

export default Main;
