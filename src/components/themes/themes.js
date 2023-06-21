import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../api';
import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';

export default function Themes() {
    const authState = useSelector((state) => state.authUser);
    const themes = useSelector((state) => state.themesSettings);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [tempid, setTempid] = useState();
    const [themeColor, setThemeColor] = useState({
        sidebar_theme: '',
        header_theme: '',
        body_theme: '',
    });

    const [updateParams, setUpdateParams] = useState({
        resource: 'api/themes',
        resourceId: tempid,
    });

    useEffect(() => {
        setUpdateParams({
            resource: 'api/themes',
        });
    }, [authState]);

    const handleChange = (e) => {
        setThemeColor({ ...themeColor, [e.target.name]: e.target.value });
    };

    const colorTheme = async () => {
        try {
            setIsLoading(true);
            const themeColor = await api.themes.getList(updateParams);
            setThemeColor({
                ...themeColor.data.data[0],
            });

            const updatedThemeColor = {
                header_theme: themeColor.data.data[0].header_theme,
                sidebar_theme: themeColor.data.data[0].sidebar_theme,
                body_theme: themeColor.data.data[0].body_theme,
            };

            dispatch({ type: 'THEME', payload: { ...updatedThemeColor } });
            localStorage.setItem('theme', JSON.stringify(updatedThemeColor));
            setUpdateParams({
                ...updateParams,
                resourceId: themeColor.data.data[0].user_id,
            });

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        colorTheme();
    }, [tempid]);

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setThemeColor({ ...JSON.parse(localStorage.getItem('theme')) });
        } else {
            setThemeColor({ ...themes });
        }
    }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const themeUpdateData = { ...themeColor };
            const orig = {
                ...themeUpdateData,
                user_id: authState.profile.user_id,
            };
            await api.themes.update(updateParams, orig);
            // setThemeColor({
            //     ...themeColor
            // });

            dispatch({ type: 'THEME', payload: { ...themeColor } });
            toastr.success('Success', 'Theme updated Successfully');
        } catch (error) {
            toastr.error('Error', error.message);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <div
                        className="font-weight-bolder text-primary pt-4 ps-4 "
                        style={{ fontSize: '22px', fontWeight: 'bold' }}
                    >
                        Select Themes
                    </div>
                    <div className="d-flex align-items-center my-3 mx-4">
                        <div className="row">
                            <div className="col-xl-4 d-flex justify-content-end">
                                <label for="header_theme">Header Theme</label>
                            </div>
                            <div className="col-xl-8 d-flex justify-content-start">
                                <input
                                    className="form-control"
                                    style={{ width: '300px' }}
                                    type="color"
                                    id="header_theme"
                                    name="header_theme"
                                    onChange={handleChange}
                                    value={themeColor.header_theme}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center my-3 mx-4">
                        <div className="row">
                            <div className="col-xl-4 d-flex justify-content-end">
                                <label for="header_theme">Sidebar Theme</label>
                            </div>
                            <div className="col-xl-8 d-flex justify-content-start">
                                <input
                                    className="form-control"
                                    style={{ width: '300px' }}
                                    type="color"
                                    id="sidebar_theme"
                                    name="sidebar_theme"
                                    onChange={handleChange}
                                    value={themeColor.sidebar_theme}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center my-3 mx-4">
                        <div className="row">
                            <div className="col-xl-4 d-flex justify-content-end">
                                <label for="header_theme">Body Theme</label>
                            </div>
                            <div className="col-xl-8 d-flex justify-content-start">
                                <input
                                    className="form-control"
                                    style={{ width: '320px' }}
                                    type="color"
                                    id="body_theme"
                                    name="body_theme"
                                    onChange={handleChange}
                                    value={themeColor.body_theme}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center my-3 mx-4">
                        <div className="row">
                            <div className="col-xl-12 d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    <div>Submit</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
