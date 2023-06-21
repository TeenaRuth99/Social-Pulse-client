import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import ContainerLoader from '../loader/container-loader';
import { toastr } from 'react-redux-toastr';
import api from '../../api';

export default function SchemaAnamoly() {
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState('');

    const params = useParams();



    const navigate = useNavigate();

    useEffect(() => {
        const fetchVolumeData = async (data) => {
            try {
                setIsLoading(true);
                const request = {
                    resource: 'api/anamoly/schema',
                    resourceId: {
                        id: params.id,
                        anamoly_id: params.anamoly_id,
                    },
                };
                const volumeData = await api.themes.update(request);

                setVolume(volumeData.data);

                if (volumeData.data.status === 200) {
                    setIsLoading(false);
                    toastr.success('Success', volumeData.data.message);
                    navigate('/dashboard/schema');
                } else if (volumeData.data.status === 400) {
                    setIsLoading(false);
                    toastr.error('Error', 'No data found');
                }
            } catch (error) {}
        };

        fetchVolumeData();
    }, []);

    return (
        <>
            {isLoading ? (
                <ContainerLoader></ContainerLoader>
            ) : (
                <Container>
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: '85vh' }}
                    >
                        <div
                            className="rounded-5 mx-2 my-4 p-4 w-75 position-relative"
                            style={{
                                boxShadow: 'rgba(0,0,0,0.2) 0px 2px 8px 0px',
                                backgroundColor: 'whitesmoke',
                                marginLeft: '12.5%',
                            }}
                        >
                            {volume.status === 200 ? (
                                <>
                                    <div>
                                        <p className="text-primary">
                                            Now, you can access the volume and
                                            distribution quicksight links below:
                                        </p>

                                        <div className="row  ">
                                            <div
                                                className="col-4 design"
                                                style={{ fontSize: '20px' }}
                                            >
                                                Volume
                                            </div>
                                            {/* <div
                                                className="col-8"
                                                style={{ fontSize: '14px' }}
                                            >
                                                <a
                                                    className="dex"
                                                    href="https://dev.d287oo8ypyjyw5.amplifyapp.com/dashboard/volume/a9a3337e-7462-4837-9070-bff8ca22ecb9"
                                                >
                                                    https://dev.d287oo8ypyjyw5.amplifyapp.com/dashboard/volume/a9a3337e-7462-4837-9070-bff8ca22ecb9
                                                </a>
                                            </div> */}
                                            {/* <div
                                                className="col-4 design"
                                                style={{ fontSize: '20px' }}
                                            >
                                                Distribution
                                            </div> */}
                                            {/* <div
                                                className="col-8"
                                                style={{ fontSize: '14px' }}
                                            >
                                                <a
                                                    className="dex"
                                                    href="https://dev.d287oo8ypyjyw5.amplifyapp.com/dashboard/distribution/4151a04a-a0cd-425f-87e1-4ff17b8f5d85"
                                                >
                                                    https://dev.d287oo8ypyjyw5.amplifyapp.com/dashboard/distribution/4151a04a-a0cd-425f-87e1-4ff17b8f5d85
                                                </a>
                                            </div> */}
                                        </div>

                                        {/* 
                                        <h4
                                            style={{
                                                textAlign: 'center',
                                            }}
                                        >
                                            Volume -
                                            <span style={{ fontSize: '12px' }}>
                                                <a href="https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/a9a3337e-7462-4837-9070-bff8ca22ecb9">
                                                    https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/a9a3337e-7462-4837-9070-bff8ca22ecb9
                                                </a>
                                            </span>
                                        </h4> */}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className=" text-secondary  fw-bolder fs-1 ">
                                        <div className="top-50 start-50">
                                            <BiError></BiError> No Data found
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}
