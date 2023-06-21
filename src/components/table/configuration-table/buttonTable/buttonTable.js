import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useTable } from 'react-table';

export default function ButtonTable({ buttonColumns, data }) {
    const memoziedButtonColumns = useMemo(() => buttonColumns, [buttonColumns]);
    const memeoziedRow = useMemo(() => data, [data]);
    const tableInstance = useTable({
        columns: memoziedButtonColumns,
        data: memeoziedRow,
    });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;
    return (
        <Table {...getTableProps()} borderless size="sm">
            <tbody {...getTableBodyProps()}>
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
