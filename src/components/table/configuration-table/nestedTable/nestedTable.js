import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useTable } from 'react-table';
import './nestedTable.scss';

export default function NestedTable({ nestedColumns, data, checkType }) {
    const filteredColumns = nestedColumns.filter((data) =>
        data.Visibleto.includes(checkType),
    );
    const memoziedFilteredColumns = useMemo(() => filteredColumns, []);
    const memeoziedRow = useMemo(() => data, [data]);
    const tableInstance = useTable({
        columns: memoziedFilteredColumns,
        data: memeoziedRow,
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;
    return (
        <Table {...getTableProps()} responsive size="sm">
            <thead className="text-dark border border-light">
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                className="fw-light  text-secondary"
                                {...column.getHeaderProps()}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody
                {...getTableBodyProps()}
                className=" text-dark fw-bolder  border-0 border border-light"
            >
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
