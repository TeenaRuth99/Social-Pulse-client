import React from 'react';
import Limitdropup from '../limit-drop-up/limit-drop-up';
import Pagination from '../pagination/pagination';
import ConfigurationTable from '../table/configuration-table/table/table';

import { Row } from 'react-bootstrap';

export default function DynamicConfigurationTable({
    row,
    columns,
    isPagination,
    nestedColumns,
    isLimit,
    buttonColumns,
    pages,
    limit,
    handlingLimit,
    handlePageChange,
    currentPage,
    setBulkDelete,
    bulkDelete,
}) {
    return (
        <div>
            <div>
                <ConfigurationTable
                    row={row}
                    columns={columns}
                    buttonColumns={buttonColumns}
                    nestedColumns={nestedColumns}
                    setBulkDelete={setBulkDelete}
                    bulkDelete={bulkDelete}
                ></ConfigurationTable>
            </div>
            <div className="d-flex justify-content-end  mx-auto mt-5 w-100 ">
                {isLimit && (
                    <Row>
                        <div className="d-flex  mx-3">
                            <div className="py-2 font-weight-semibold">
                                Records per page
                            </div>
                            <div className=" px-1">
                                <Limitdropup
                                    limit={limit}
                                    handlingLimit={handlingLimit}
                                ></Limitdropup>
                            </div>
                        </div>
                    </Row>
                )}
                {isPagination && (
                    <div className="py-1">
                        <Pagination
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                            pages={pages}
                        ></Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
