import React, { useState } from 'react';
import 'react-widgets/scss/styles.scss';
import { Controller, useForm } from 'react-hook-form';
import { Form, Row, Col, Spinner, Container, Button } from 'react-bootstrap';
import Input from '../form-controls/Input';
import './style.css';
import { toastr } from 'react-redux-toastr';
import Dropdown from '../form-controls/Dropdown';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function AddVariable() {
    const defaultValues = {
        connectorName: '',
        databaseName: '',
        hostName: '',
        port: '',
        password: '',
        userName: '',
        dialect: '',
        additional: [],
        account: null,
        filePath:''

    };

    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors },
        reset,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues,
    });
    const navigate = useNavigate();
    const [isAccount, setIsAccount] = useState(false);
    const[isFilePath, setIsFilePath] = useState(false)

    

    const handleOnSubmit = async (resultdata) => {
        
        try {
            const data = {
                ...resultdata,
            };

            console.log(data)

            const {
                userName: username,
                databaseName: database,
                hostName: host,
                additional,
                ...rest
            } = data;

            const result = { username, database, host, ...rest };
            const connectorName = `db_${result.connectorName}`;
            delete result.connectorName;
            let res = await api.vault.postSecret(
                { resource: 'api/vault' },
                {
                    secret: `${connectorName}`,
                    data: result,
                },
            );
            
            
            if (res?.data.status === 400)
                return toastr.error('Error', res?.data?.message);
            if (res?.data?.status === 200) {
                toastr.success('Success', res?.data?.message);
                navigate('/dataSource');
                reset(defaultValues);
            }
        } catch (error) {
            toastr.error('Error', error);
        }
    };

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
                        Add Source
                    </h4>
                    <Form
                        onSubmit={handleSubmit(handleOnSubmit)}
                        className="mx-auto mt-0 w-65"
                    >
                        <fieldset
                            // className="border p-4"
                            style={{ maxHeight: '76vh' }}
                        >
                            <Row className="m-2 mb-2" >
                                
                                <Col sm={12} >
                                    <Controller
                                        control={control}
                                        name="connectorName"
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Connector Name"
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
                                                error={
                                                    errors.connectorName
                                                        ? errors.connectorName
                                                              .type ===
                                                          'required'
                                                            ? 'Connector name is required'
                                                            : 'Invalid Connector name'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={12}>
                                    <Controller
                                        control={control}
                                        name="dialect"
                                        rules={{ required: true }}
                                        render={({
                                            field,
                                            field: { value, onChange },
                                        }) => (
                                            <Dropdown
                                                label="Connector"
                                                {...field}
                                                value={value}
                                                data={[
                                                    { name: 'redshift' },
                                                    { name: 'snowflake' },
                                                    { name: 'postgresql' },
                                                    { name: 'mysql' },
                                                    { name: 'deltalake' },
                                                ]}
                                                dataKey="name"
                                                textField="name"
                                                onChange={(value) => {
                                                    onChange(value?.name);
                                                    if (value?.name === 'snowflake') {
                                                        setIsAccount(true);
                                                        setIsFilePath(false);
                                                      } else if (value?.name === 'deltalake') {
                                                        setIsAccount(false);
                                                        setIsFilePath(true);
                                                      } else {
                                                        setIsAccount(false);
                                                        setIsFilePath(false);
                                                      }

                                                }}
                                                error={
                                                    errors.dialect
                                                        ? errors.dialect
                                                              .type ===
                                                          'required'
                                                            ? 'Dialect is required'
                                                            : 'Invalid dialect'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={12} style={{display: isFilePath? 'none' : 'block' }}>
                                    <Controller
                                        control={control}
                                        name="hostName"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Host Name"
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
                                                error={
                                                    errors.hostName
                                                        ? errors.hostName
                                                              .type ===
                                                          'required'
                                                            ? 'Host name is required'
                                                            : 'Invalid host name'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={6} style={{display: isFilePath? 'none' : 'block' }}>
                                    <Controller
                                        control={control}
                                        name="port"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Port Number"
                                                type="number"
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
                                                error={
                                                    errors.port
                                                        ? errors.port.type ===
                                                          'required'
                                                            ? 'Port is required'
                                                            : 'Invalid port'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col sm={6} style={{display: isFilePath? 'none' : 'block' }}>
                                    <Controller
                                        control={control}
                                        name="databaseName"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Database Name"
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
                                                error={
                                                    errors.databaseName
                                                        ? errors.databaseName
                                                              .type ===
                                                          'required'
                                                            ? 'Database name required'
                                                            : 'Invalid database name'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>

                                <Col sm={6} style={{display: isFilePath? 'none' : 'block' }}>
                                    <Controller
                                        control={control}
                                        name="userName"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="User Name"
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
                                                error={
                                                    errors.userName
                                                        ? errors.userName
                                                              .type ===
                                                          'required'
                                                            ? 'User name required'
                                                            : 'Invalid user name'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col sm={6} style={{display: isFilePath? 'none' : 'block' }}>
                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Password"
                                                type="password"
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
                                                error={
                                                    errors.password
                                                        ? errors.password
                                                              .type ===
                                                          'required'
                                                            ? 'Password is required'
                                                            : 'Invalid password'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col>

                                {isFilePath ? (
                                    <Col sm={12}>
                                    <Controller
                                        control={control}
                                        name="filepath"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="S3 File Path"
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
                                                error={
                                                    errors.filePath
                                                        ? errors.filePath
                                                              .type ===
                                                          'required'
                                                            ? 'S3File path is required'
                                                            : 'Invalid file path'
                                                        : ''
                                                }
                                            />
                                        )}
                                    />
                                </Col> 

                                ): <>{isFilePath}</>}
                                
                                {isAccount && (
                                    <Col sm={12}>
                                        <Controller
                                            control={control}
                                            name="account"
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Account"
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
                                                    error={
                                                        errors.account
                                                            ? errors.account
                                                                  .type ===
                                                              'required'
                                                                ? 'Account  is required'
                                                                : 'Invalid account'
                                                            : ''
                                                    }
                                                />
                                            )}
                                        />
                                    </Col>
                                )}
                            </Row>
                        </fieldset>

                        {/* <fieldset class="border p-4 mt-2 position-relative">
                            <legend class="float-none w-auto text-center text-success">
                                Additional
                            </legend>
                            <span
                                className="position-absolute end-0  bg-primary text-center text-white"
                                style={{
                                    top: '-37px',
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    append({
                                        lastName: '',
                                        key: 'New variable',
                                    })
                                }
                            >
                                +
                            </span>
                            <Row className="m-2">
                                <Row>
                                    {fields.map((item, index) => {
                                        return (
                                            <Col sm={12} md={4}>
                                                <Controller
                                                    control={control}
                                                    name={`additional.${index}.val`}
                                                    // rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            label={item.key}
                                                            type="text"
                                                            remove={remove}
                                                            index={index}
                                                            style={{
                                                                border: 'none',
                                                                borderBottom:
                                                                    '1px solid lightgrey',
                                                                backgroundColor:
                                                                    'transparent',
                                                                borderRadius:
                                                                    'unset',
                                                            }}
                                                            className="line-input"
                                                        />
                                                    )}
                                                />
                                                {/* <Controller
                                                    render={({ field }) => (
                                                        <input {...field} />
                                                    )}
                                                    name={`test.${index}.lastName`}
                                                    control={control}
                                                /> */}
                        {/* </Col>
                                        );
                                    })}
                                </Row>
                            </Row>
                        </fieldset> */}
                        <Row className="mt-4">
                            <Col>
                                <div className="d-flex justify-content-end">
                                    {/* <Button
                                        type="button"
                                        className="btn  btn-secondary mt-4 me-4"
                                        onClick={add}
                                    >
                                        Add
                                    </Button> */}
                                    <Button
                                        type="button"
                                        onClick={() => navigate('/dataSource')}
                                        className="btn btn my-1  mt-2 mx-3"
                                        variant="outline-secondary"
                                        size="md"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="btn btn my-1   mt-2 px-3"
                                        style={{
                                            background: 'rgb(73, 151, 73)',
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <Spinner
                                                animation="border"
                                                role="status"
                                                style={{
                                                    height: '15px',
                                                    width: '15px',
                                                }}
                                            />
                                        ) : (
                                            'Save'
                                        )}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </Container>
    );
}
