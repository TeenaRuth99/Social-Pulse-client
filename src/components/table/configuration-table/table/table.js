import React, { useMemo, useState } from 'react';
import NestedTable from '../nestedTable/nestedTable';
import MainTable from '../mainTable/mainTable';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import './table.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useTable, useExpanded } from 'react-table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import ButtonTable from '../buttonTable/buttonTable';

export default function Tablefunc({
    columns,
    row,
    nestedColumns,
    buttonColumns,
    setBulkDelete,
    bulkDelete,
}) {
    const [arrow, setArrow] = useState(-1);
    const memoziedColumns = useMemo(() => columns, [columns]);
    const memoziedRow = useMemo(() => row, [row]);

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            arrow === eventKey ? setArrow(-1) : setArrow(eventKey);
        });

        return (
            <>
                <Button
                    className="bg-light text-dark border-0 p-0 m-0"
                    type="button"
                    onClick={decoratedOnClick}
                >
                    {children}
                </Button>
            </>
        );
    }
    const tableInstance = useTable(
        {
            columns: memoziedColumns,
            data: memoziedRow,
            initialState: {
                pageIndex: 0,
                hiddenColumns: ['Data source'], //use property option, in columns define id name "id"
            },
        },
        useExpanded,
    );
    const { getTableProps, rows, prepareRow } = tableInstance;
    return (
        <>
            <Table
                {...getTableProps()}
                responsive
                className="custom-table-height tablefontsize"
            >
                <Accordion>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()}>
                                <Row
                                    className="rounded-3 mx-1 my-1 p-0 bg-light"
                                    style={{
                                        boxShadow:
                                            'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                    }}
                                >
                                    <Col
                                        md={2}
                                        lg={2}
                                        sm={12}
                                        xs={12}
                                        className="d-flex  align-items-center "
                                    >
                                        <Row>
                                            <Col md={1} lg={1} sm={1} xs={1} className='ms-2 me-2'>
                                                <CustomToggle eventKey={i}>
                                                    {row.original.check_type !==
                                                    'schema' ? (
                                                        <>
                                                            {arrow === i ? (
                                                                <FaAngleDown></FaAngleDown>
                                                            ) : (
                                                                <FaAngleRight></FaAngleRight>
                                                            )}
                                                        </>
                                                    ) : null}
                                                </CustomToggle>
                                            </Col>
                                            <Col
                                                md={1}
                                                lg={1}
                                                sm={1}
                                                xs={1}
                                                className="d-flex flex-row gap-1"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={
                                                        row.original.config_id
                                                    }
                                                    className="mb-1 mt-2 "
                                                    onChange={(e) => {
                                                        // Case 1  : The user checks the box
                                                        if (e.target.checked) {
                                                            setBulkDelete([
                                                                ...bulkDelete,
                                                                e.target.value,
                                                            ]);
                                                        }
                                                        // Case 2  : The user unchecks the box
                                                        else {
                                                            setBulkDelete(
                                                                bulkDelete.filter(
                                                                    (data) =>
                                                                        data !==
                                                                        e.target
                                                                            .value,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                ></input>
                                                <div
                                                    className={`fw-bolder ms-2  ${
                                                        row.original
                                                            .check_type ===
                                                        'freshness'
                                                            ? `text-color-${row.original.check_type} `
                                                            : row.original
                                                                  .check_type ===
                                                              'schema'
                                                            ? `text-color-${row.original.check_type} `
                                                            : row.original
                                                                  .check_type ===
                                                              'volume'
                                                            ? `text-color-${row.original.check_type} `
                                                            : row.original
                                                                  .check_type ===
                                                              'distribution'
                                                            ? `text-color-${row.original.check_type}`
                                                            : null
                                                    }`}
                                                    style={{
                                                        fontSize: '17px',
                                                        overflowWrap:
                                                            'break-word',
                                                    }}
                                                >
                                                    {row.original.check_type}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Card.Header className="bg-light border-0 p-0">
                                            <Row>
                                                <Col
                                                    lg={10}
                                                    md={10}
                                                    sm={10}
                                                    xs={10}
                                                    className="p-0 mx-3"
                                                >
                                                    <MainTable
                                                        data={[row.original]}
                                                        columns={columns}
                                                    ></MainTable>
                                                    <Accordion.Collapse
                                                        eventKey={i}
                                                    >
                                                        <div className="bg-light p-1">
                                                            <NestedTable
                                                                data={[
                                                                    row.original,
                                                                ]}
                                                                nestedColumns={
                                                                    nestedColumns
                                                                }
                                                                checkType={
                                                                    row.original
                                                                        .check_type
                                                                }
                                                            ></NestedTable>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    md={1}
                                                    sm={1}
                                                    xs={1}
                                                    className="d-flex align-items-center mt-2 p-0 "
                                                >
                                                    <ButtonTable
                                                        data={[row.original]}
                                                        buttonColumns={
                                                            buttonColumns
                                                        }
                                                    ></ButtonTable>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
                </Accordion>
            </Table>
        </>
    );
}
