import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useTable, useExpanded } from 'react-table';

export default function MainTable({ columns, data }) {
    const memoziedColumns = useMemo(() => columns, [columns]);
    const memoziedRow = useMemo(() => data, [data]);

    const tableInstance = useTable(
        {
            columns: memoziedColumns,
            data: memoziedRow,
        },
        useExpanded,
    );
    const { getTableProps, getTableBodyProps, rows, prepareRow } =
        tableInstance;

    return (
        <Table {...getTableProps()} responsive borderless size="sm">
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className="d-flex flex-row ">
                            {row.cells.map((cell) => (
                                <>
                                    {cell.value !== null && (
                                        <div
                                            {...cell.getCellProps()}
                                            style={{
                                                width: `${cell.column.width}%`,
                                                overflowX: 'auto',
                                            }}
                                        >
                                            <div className="fw-light">
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Header')}
                                                </td>
                                            </div>
                                            <div>
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="text-dark fw-bolder"
                                                    style={{
                                                        wordBreak: ' break-all',
                                                        overflow: 'hidden',
                                                    }}
                                                    md={cell.length}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
