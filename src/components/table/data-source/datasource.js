import React, { useState, useEffect } from 'react';
import api from '../../../api';
import DynamicUserTable from '../../tablewithpaginationandlimit/user-table';
import './styles.scss';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TableSkeletonLoader from '../../loader/table-skeleton-loader/table-skeleton-loader';
import { RouteKeys } from '../../../containers/routes/route-keys';
import { toastr } from 'react-redux-toastr';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import ModalPage from '../../modal/modal';
// import { findSecretAndDialect } from '../../../helper/findSecretAndDialect';

export default function DataSource() {
    const [datasource, setDataSource] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [singleDeleteId, setSingleDeleteId] = useState();
    const [isSingle, setIsSingle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const request = {
        resource: 'api/vault',
    };

    const handleDelete = async (secret) => {
        try {
            let res = await api.vault.deleteSecret(secret);
            if (res.status !== 200) {
                return toastr.error('Error', res?.message);
            }
            setDataSource(datasource?.filter((item) => item !== secret));

            toastr.success('Success', 'Secret removed');
            fetchDataSourceTable();
        } catch (error) {
            toastr.error('Error', error.message);
        }
    };

    const columns = [
        {
            Header: 'Connector name',
            Cell: ({ row }) => {
                return (
                    // <div>{findSecretAndDialect(row?.original?.name)?.[1]}</div>
                    <span>{row?.original?.name?.substring(3)}</span>
                );
            },
        },
        {
            Header: 'Connector',
            Cell: ({ row }) => (
                // <div>{findSecretAndDialect(row?.original?.name)?.[0]}</div>
                <span>{row?.original?.connector}</span>
            ),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <>
                    <AiFillEye
                        className="text-dark mx-2 font-size "
                        type="button"
                        onClick={() => {
                            navigate(`/datasource/${row.original.name}`);
                        }}
                    ></AiFillEye>
                    <FaTrashAlt
                        type="button"
                        className="text-dark mx-2 font-size"
                        // onClick={() => handleDelete(row.original.name)}
                        onClick={() => {
                            setModalShow(true);
                            setSingleDeleteId(row.original.name);
                            setIsSingle(true);
                        }}
                    ></FaTrashAlt>
                </>
            ),
        },
    ];

    const fetchDataSourceTable = async () => {
        try {
            setIsLoading(true);
            const datasourceApi = await api.vault.getVaultapi(request);
            setDataSource(datasourceApi?.data?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toastr.error('Error', 'Vault Data is not found');
        }
    };

    useEffect(() => {
        fetchDataSourceTable();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {isSingle && (
                <ModalPage
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    heading={'Delete Source'}
                    body={'Are you sure want to delete ?'}
                    success={'Delete'}
                    failure={'Cancel'}
                    id={singleDeleteId}
                    action={handleDelete}
                />
            )}

            <Container>
                <div className="d-flex justify-content-between">
                    <h5 className="text-dark pt-4 fw-bold">Data Source</h5>
                    <div className="d-flex gap-2 mt-3 mb-3">
                        <button
                            type="button"
                            className="btn btn text-light custom_button d-flex flex-row"
                            style={{
                                backgroundColor: 'rgb(73, 151, 73)',
                            }}
                            onClick={() => navigate(RouteKeys.AddVariable)}
                        >
                            <div className="add-user">
                                <div className="icons">
                                    <span>Add Source</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <TableSkeletonLoader
                        intialrows={2}
                        initalcolumns={6}
                    ></TableSkeletonLoader>
                ) : (
                    <div>
                        <DynamicUserTable
                            row={datasource.length ? datasource : []}
                            columns={columns}
                            isPagination={false}
                            isLimit={false}
                        ></DynamicUserTable>
                    </div>
                )}
            </Container>
        </>
    );
}
