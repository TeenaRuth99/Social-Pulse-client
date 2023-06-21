import React, { useEffect, useState } from 'react';
import 'react-widgets/scss/styles.scss';
import { Controller, useForm } from 'react-hook-form';
import { Form, Row, Col, Button, Spinner, Container } from 'react-bootstrap';
import Input from '../form-controls/Input';
import './style.css';

import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { FaArrowLeft } from 'react-icons/fa';
// import { findSecretAndDialect } from '../../helper/findSecretAndDialect';

export default function ViewDataSource() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const defaultValues = {
        connectorName: '',
        databaseName: '',
        hostName: '',
        port: '',
        password: '',
        userName: '',
        connector: '',
        additional: [],
    };

    let { secret } = useParams();
    const navigate = useNavigate();

    const { control } = useForm({
        defaultValues,
    });

    useEffect(async () => {
        setLoading(true);
        let res = await api.vault.getSecret(secret);
        setLoading(false);
        let {
            data: {
                data: { data },
            },
        } = res;
        if (res?.status !== 200) {
            return toastr.error('Error', res?.message);
        }
        setData(data);
    }, []);

    if (loading)
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '80vh' }}
            >
                <Spinner variant="primary" />
            </div>
        );

    return (
        <Container>
            <div
                className="d-flex justify-content-center align-items-center "
                style={{ height: '100vh' }}
            >
                <div
                    className="rounded-5 mx-2 mt-0 my-4 p-4 w-75 position-relative "
                    style={{
                        boxShadow: 'rgba(0,0,0,0.2) 0px 2px 8px 0px',
                        backgroundColor: 'whitesmoke',
                        marginLeft: '12.5%',
                    }}
                >
                    <h4 className="fw-bold ms-4 text-start text-success text-center">
                        Data Source
                    </h4>

                    <div
                        className="d-flex justify-content-end position-absolute "
                        style={{
                            top: '5%',
                            right: '5%',
                            cursor: 'pointer',
                        }}
                    >
                        <Button
                            variant="dark"
                            size="sm"
                            onClick={() => navigate('/datasource')}
                        >
                            <FaArrowLeft /> Back
                        </Button>
                    </div>

                    <Form className="mx-auto mt-0 w-65">
                        <fieldset style={{ maxHeight: '76vh' }}>
                            <Row className="m-2 mb-2">
                                <Col sm={12}>
                                    <Controller
                                        control={control}
                                        name="connectorName"
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Connector Name"
                                                value={
                                                    // findSecretAndDialect(
                                                    //     secret,
                                                    // )?.[1]
                                                    secret?.split('_')?.[1]
                                                }
                                                type="text"
                                                isMandatory={true}
                                                style={{
                                                    border: 'none',
                                                    borderBottom:
                                                        '1px solid lightgrey',
                                                    backgroundColor:
                                                        'transparent',
                                                    borderRadius: 'unset',
                                                }}
                                                className="line-input"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={12}>
                                    <Controller
                                        control={control}
                                        name="connector"
                                        render={({ field }) => {
                                            return (
                                                <Input
                                                    {...field}
                                                    label="Connector"
                                                    type="text"
                                                    isMandatory={true}
                                                    value={data?.connector}
                                                    style={{
                                                        border: 'none',
                                                        borderBottom:
                                                            '1px solid lightgrey',
                                                        backgroundColor:
                                                            'transparent',
                                                        borderRadius: 'unset',
                                                    }}
                                                    className="line-input"
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                </Col>

                                <Col sm={12}>
                                    <Controller
                                        control={control}
                                        name="hostName"
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Host Name"
                                                type="text"
                                                value={data?.host}
                                                isMandatory={true}
                                                style={{
                                                    border: 'none',
                                                    borderBottom:
                                                        '1px solid lightgrey',
                                                    backgroundColor:
                                                        'transparent',
                                                    borderRadius: 'unset',
                                                }}
                                                className="line-input"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={6}>
                                    <Controller
                                        control={control}
                                        name="port"
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Port Number"
                                                type="number"
                                                value={data?.port}
                                                isMandatory={true}
                                                style={{
                                                    border: 'none',
                                                    borderBottom:
                                                        '1px solid lightgrey',
                                                    backgroundColor:
                                                        'transparent',
                                                    borderRadius: 'unset',
                                                }}
                                                className="line-input"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={6}>
                                    <Controller
                                        control={control}
                                        name="databaseName"
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Database Name"
                                                type="text"
                                                value={data?.database}
                                                isMandatory={true}
                                                style={{
                                                    border: 'none',
                                                    borderBottom:
                                                        '1px solid lightgrey',
                                                    backgroundColor:
                                                        'transparent',
                                                    borderRadius: 'unset',
                                                }}
                                                className="line-input"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={6}>
                                    <Controller
                                        control={control}
                                        name="userName"
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="User Name"
                                                type="text"
                                                value={data?.username}
                                                isMandatory={true}
                                                style={{
                                                    border: 'none',
                                                    borderBottom:
                                                        '1px solid lightgrey',
                                                    backgroundColor:
                                                        'transparent',
                                                    borderRadius: 'unset',
                                                }}
                                                className="line-input"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={6}>
                                    <Controller
                                        control={control}
                                        name="password"
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Password"
                                                type="password"
                                                value={data?.password}
                                                isMandatory={true}
                                                style={{
                                                    border: 'none',
                                                    borderBottom:
                                                        '1px solid lightgrey',
                                                    backgroundColor:
                                                        'transparent',
                                                    borderRadius: 'unset',
                                                }}
                                                className="line-input"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>
                        </fieldset>
                    </Form>
                </div>
            </div>
        </Container>
    );
}
