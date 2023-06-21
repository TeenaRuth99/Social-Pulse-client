import React from 'react';
import api from '../../api';
import { data } from '../../helper/data';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useGlobalContext } from '../../components/context/Global';
import { toastr } from 'react-redux-toastr';
import './Model.scss';
import youtube from '../../assets/logo/icons8-youtube.svg';
import facebook from '../../assets/logo/icons8-facebook.svg';
import twitter from '../../assets/logo/icons8-twitter.svg';
import linkedin from '../../assets/logo/icons8-linkedin.svg';
import insta from '../../assets/logo/icons8-instagram.svg';
import { FaTimes } from 'react-icons/fa';
import Formcomponent from '../../components/FormComponents/Form';
//import axios from 'axios';

const Model = (props) => {
    const {
        setCurrentItem,

        currentItem,

        setcommand,
        command,
        setOptions,
        history,
        start_date,

        setstart_date,
    } = useGlobalContext();

    useEffect(() => {
        if (props.item) setCurrentItem(props.item);
    }, [props]);

    let arr1 = [];
    const request = {
        item: currentItem,
    };

    const [loading, setLoading] = useState(true);

    const fetchEndpoints = async () => {
        try {
            setLoading(true);
            const endpoints = await api.crud.getEndpoint(request);
            //setPages(userData.data.pages);
            let s = endpoints.data?.data.rows;
            for (let i of s) {
                // Push the values of every object into arr
                arr1.push(...Object.values(i));
            }
            setOptions(endpoints.data?.data.rows);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const finalObj = {};

    let arr = [];

    {
        data.filter((task) => task.stream.includes(currentItem)).map((item) => {
            arr.push({ [item.name]: item.initial?.[currentItem] });
        });
        // arr.push({ start_date: undefined });
    }

    arr.map((item) => {
        Object.assign(finalObj, item);
    });

    let [field, setfield] = useState(finalObj);

    useEffect(() => {
        fetchEndpoints();
    }, []);
    useEffect(
        async () => {
            try {
                setLoading(true);
                const response = await api.crud.getConfig(request);
                if (
                    response.data.status == 200 &&
                    response.data.data.rows.length != 0
                ) {
                    setfield(response.data.data.rows[0]);
                    setstart_date(
                        response.data.data.rows[0].start_date != null
                            ? new Date(response.data.data.rows[0].start_date)
                            : '',
                    );
                    setcommand(true);
                } else {
                    setfield(finalObj);
                    setcommand(false);
                }
                setLoading(false);
            } catch (error) {}
        },
        [],
        [currentItem],
    );
    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <div className="title">
                            <h5
                                className={
                                    currentItem == 'Youtube'
                                        ? 'fw-bold ycolor'
                                        : currentItem == 'Facebook'
                                        ? 'fw-bold fcolor'
                                        : currentItem == 'Linkedin'
                                        ? 'fw-bold lcolor'
                                        : currentItem == 'spotify'
                                        ? 'fw-bold scolor'
                                        : currentItem == 'tiktok'
                                        ? 'fw-bold text-dark'
                                        : currentItem == 'Twitter'
                                        ? 'fw-bold tcolor'
                                        : currentItem == 'Instagram'
                                        ? 'fw-bold icolor'
                                        : ''
                                }
                            >
                                {currentItem == 'Youtube' ? (
                                    <img src={youtube} alt="" />
                                ) : currentItem == 'Facebook' ? (
                                    <img src={facebook} alt="" />
                                ) : currentItem == 'Linkedin' ? (
                                    <img src={linkedin} alt="" />
                                ) : currentItem == 'spotify' ? (
                                    <img src={youtube} alt="" />
                                ) : currentItem == 'tiktok' ? (
                                    <img src={youtube} alt="" />
                                ) : currentItem == 'Twitter' ? (
                                    <img src={twitter} alt="" />
                                ) : currentItem == 'Instagram' ? (
                                    <img src={insta} alt="" />
                                ) : (
                                    ''
                                )}
                                {currentItem}
                            </h5>
                        </div>
                        <button
                            onClick={() => {
                                props.setopen(false);
                            }}
                            className="closebtn"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="body">
                        <Formik
                            key={`${currentItem}`}
                            initialValues={field}
                            enableReinitialize
                            onSubmit={async (values) => {
                                if (values.endpoint == undefined) {
                                    toastr.error('select atleast one endpoint');
                                } else {
                                    let seq = ['1'];
                                    let endpointnm = [];
                                    values.endpoint.map((item) => {
                                        seq.push(item.sequence);
                                        endpointnm.push(item.display_name);
                                    });

                                    setLoading(true);
                                    if (command == true) {
                                        try {
                                            setLoading(true);
                                            const request = {
                                                resource: `config/edit/${currentItem}`,
                                            };

                                            const res =
                                                await api.crud.updateConfig(
                                                    request,
                                                    {
                                                        ...values,
                                                        currentItem,
                                                        seq,
                                                        history,
                                                        endpointnm,
                                                        start_date,
                                                    },
                                                );

                                            if (res.status === 200) {
                                                toastr.success(
                                                    'Success',
                                                    'Config updated successfully',
                                                );
                                                setLoading(false);
                                                props.setopen(false);
                                            } else {
                                                toastr.error(
                                                    'Error',
                                                    res.data.message,
                                                );

                                                setLoading(false);
                                                props.setopen(false);
                                            }
                                        } catch (error) {
                                            toastr.error(
                                                'Error',
                                                error.message,
                                            );
                                        }
                                    } else {
                                        try {
                                            const request = {
                                                resource: 'config',
                                            };
                                            const res =
                                                await api.crud.addconfig(
                                                    request,
                                                    {
                                                        ...values,
                                                        currentItem,
                                                        seq,
                                                        history,
                                                        endpointnm,
                                                        start_date,
                                                    },
                                                );
                                            if (res.status === 200) {
                                                toastr.success(
                                                    'Success',
                                                    'saved successfully',
                                                );
                                                setLoading(false);
                                            } else {
                                                toastr.error(
                                                    'Error',
                                                    res.data.message,
                                                );
                                            }
                                        } catch (error) {
                                            toastr.error(
                                                'Error',
                                                error.message,
                                            );
                                        }
                                    }
                                }
                            }}
                        >
                            {({ values, setFieldValue }) => (
                                <Formcomponent
                                    setFieldValue={setFieldValue}
                                    values={values}
                                />
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Model;
