import React from 'react';
import api from '../../api';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaTwitter,
    FaSpotify,
    FaTiktok,
    FaAsterisk,
    FaThumbsUp,
} from 'react-icons/fa';
import { useEffect } from 'react';

import { useGlobalContext } from '../../components/context/Global';
import './admin.scss';
import Model from '../Model/Model';
import { useState } from 'react';

const Admin = () => {
    const {
        setCurrentItem,
        uniqueStream,
        currentItem,
        src,
        setsrc,
        sethistory,
    } = useGlobalContext();
    let apps = [];
    const [open, setopen] = useState(false);
    useEffect(async () => {
        try {
            const response = await api.crud.getappname();

            response.data.data.rows.map((item) => {
                apps.push(item.app_name);
            });
            setsrc(apps);
        } catch (error) {}
    }, []);

    return (
        <>
            <div>
                <div className="title">
                    <span>
                        <FaAsterisk
                            size={'1.8em'}
                            className="m-1 px-2"
                            color="rgb(34, 194, 34)"
                        />
                        <label className="fw-bold ">POPULAR PLATFORMS</label>
                    </span>
                </div>

                <div className="main">
                    {uniqueStream.map((item) => {
                        return (
                            <div className="innerdiv" key={item}>
                                <button
                                    className={
                                        item == 'Youtube'
                                            ? 'ybtn  '
                                            : item == 'Facebook'
                                            ? ' fbtn  '
                                            : item == 'Linkedin'
                                            ? 'lbtn  '
                                            : item == 'Spotify'
                                            ? 'sbtn  '
                                            : item == 'Tiktok'
                                            ? ' tikbtn '
                                            : item == 'Twitter'
                                            ? ' tbtn  '
                                            : item == 'Instagram'
                                            ? ' ibtn '
                                            : ' btn2  '
                                    }
                                    onClick={() => {
                                        setCurrentItem(item);
                                        setopen(true);

                                        sethistory(true);
                                    }}
                                >
                                    {src.includes(item) ? (
                                        <>
                                            <FaThumbsUp
                                                size={'1.2em'}
                                                className="acticon"
                                                color="rgb(34, 194, 34)"
                                            />
                                        </>
                                    ) : (
                                        ''
                                    )}
                                    {item == 'Youtube' ? (
                                        <>
                                            <FaYoutube
                                                className="m-1 iconsize"
                                                color="white"
                                            />
                                        </>
                                    ) : item == 'Facebook' ? (
                                        <FaFacebook
                                            className="m-1 iconsize"
                                            color="white"
                                        />
                                    ) : item == 'Twitter' ? (
                                        <FaTwitter
                                            className="m-1 iconsize"
                                            color="white"
                                        />
                                    ) : item == 'Linkedin' ? (
                                        <FaLinkedin
                                            className="m-1 iconsize"
                                            color="white"
                                        />
                                    ) : item == 'Instagram' ? (
                                        <FaInstagram
                                            className="m-1 iconsize"
                                            color="white"
                                        />
                                    ) : item == 'Spotify' ? (
                                        <FaSpotify
                                            className="m-1 iconsize "
                                            color="white"
                                        />
                                    ) : item == 'Tiktok' ? (
                                        <FaTiktok
                                            className="m-1 iconsize"
                                            color="white"
                                        />
                                    ) : (
                                        ''
                                    )}
                                    <label className="txtlbl">{item}</label>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            {open && <Model item={currentItem} setopen={setopen} />}
        </>
    );
};

export default Admin;
