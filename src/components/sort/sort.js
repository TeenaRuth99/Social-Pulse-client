import React, { useState } from 'react';
import { Col, OverlayTrigger, Row, Accordion } from 'react-bootstrap';
import { FaSlidersH } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import './sort.scss';

export default function Sort({ data, handleSort }) {
    const [sort, setSort] = useState({
        item: data[0].column_name,
        order: 'ASC',
    });
    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(!close);
    }

    const handleSubmit = () => {
        handleClose();
        handleSort(sort);
    };

    const [boolOne, setBoolOne] = useState(true);
    const [boolTwo, setBoolTwo] = useState(false);

    // const [close, setClose] = useState(false);
    const handleToggle = (e) => {
        const { value } = e.target;
        if (value === 'false') {
            setSort({ ...sort, order: 'ASC' });
            setBoolOne(true);
            setBoolTwo(false);
        }
        if (value === 'true') {
            setSort({ ...sort, order: 'DESC' });
            setBoolTwo(true);
            setBoolOne(false);
        }
    };

    const handleClear = () => {
        setClose(false);
        setSort({ ...sort, item: '', order: '' });
        handleSort({ ...sort, item: '', order: '' });
    };


    const popover = (
        <div
            className="my-1 shadow-lg bg-light rounded p-3 border "
            style={{ width: '18em' }}
        >
            <Row>
                <Col>
                    <Accordion className="my-2">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sort</Accordion.Header>
                            <Accordion.Body className="accordion-body-table" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                {data.map((data) => (
                                    <div>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSort({
                                                        ...sort,
                                                        item: data.column_name,
                                                    });
                                                }
                                            }}
                                            checked={
                                                data.column_name === sort.item
                                            }
                                            id={data.column_name}
                                        ></input>
                                        <label
                                            className=" px-2"
                                            htmlFor={data.column_name}
                                        >
                                            {data.name}
                                        </label>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
            <div className='d-flex flex-row gap-2'>
                {/* <Col>
                    <input
                        type="checkbox"
                        checked={bool}
                        onChange={handleToggle}
                    ></input>
                </Col> */}

                <div>
                    <div className="toggle-but d-flex flex-row mt-2">
                        <div>
                            <input
                                id="toggle-on"
                                className="toggle toggle-left"
                                name="toggle"
                                value="false"
                                type="radio"
                                checked={boolOne}
                                onChange={handleToggle}
                            />
                            <label for="toggle-on" className="btn-tog">
                                Asc
                            </label>
                        </div>
                        <div>
                            {' '}
                            <input
                                id="toggle-off"
                                className="toggle toggle-right"
                                name="toggle"
                                value="true"
                                type="radio"
                                checked={boolTwo}
                                onChange={handleToggle}
                            />
                            <label for="toggle-off" className="btn-tog">
                                Desc
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="secondary" className="mt-1" onClick={handleClear}>
                        Reset
                    </Button>
                </div>
                <div>
                    <Button
                        variant="success"
                        className="custom-button-do my-1"
                        onClick={handleSubmit}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
    return (
        <OverlayTrigger
            rootClose
            trigger="click"
            placement="bottom-end"
            overlay={popover}
        >
            <Button
                variant="dark"
                className="me-2"
                onClick={() => setClose(true)}
            >
                <FaSlidersH></FaSlidersH>
            </Button>
        </OverlayTrigger>
    );
}