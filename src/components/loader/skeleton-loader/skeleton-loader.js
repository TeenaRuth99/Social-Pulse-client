import React from 'react';
import { Table, Placeholder, Row, Col, Card } from 'react-bootstrap';

export default function SkeletonLoader({ intialrows, initalcolumns }) {
    return (
        <>
            <Table
                bordered
                responsive
                style={{ height: '450px' }}
                className="mt-4"
            >
                {[...Array(intialrows)].map((e, i) => (
                    <Row
                        className="py-2 rounded-2 m-1 bg-light"
                        style={{
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        }}
                    >
                        <Col md={2}>
                            {' '}
                            <Placeholder animation="glow">
                                <Placeholder
                                    xs={9}
                                    className="rounded-1 ms-3 my-3"
                                    size="lg"
                                    bg="primary"
                                />
                            </Placeholder>
                        </Col>
                        <Col md={10}>
                            <>
                                <Card className="border-0">
                                    <Card.Header className="bg-light border-0">
                                        <Row>
                                            {[...Array(initalcolumns)].map(
                                                (e, i) => (
                                                    <Col>
                                                        <Placeholder animation="glow">
                                                            <Placeholder
                                                                xs={12}
                                                                className="rounded-1"
                                                                size="lg"
                                                            />
                                                        </Placeholder>
                                                    </Col>
                                                ),
                                            )}
                                        </Row>
                                        <Row>
                                            {[...Array(initalcolumns)].map(
                                                (e, i) => (
                                                    <Col>
                                                        <Placeholder animation="glow">
                                                            <Placeholder
                                                                xs={12}
                                                                className="rounded-1"
                                                                size="lg"
                                                            />
                                                        </Placeholder>
                                                    </Col>
                                                ),
                                            )}
                                        </Row>
                                    </Card.Header>
                                </Card>
                            </>
                        </Col>
                    </Row>
                ))}
            </Table>
        </>
    );
}
