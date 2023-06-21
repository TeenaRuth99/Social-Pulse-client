import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContainerLoader from '../../components/loader/container-loader';
import enigma from 'enigma.js';
const schemajson = require('enigma.js/schemas/12.170.2.json');

export default function QlikDashboard() {
    const { appId, sheetId } = useParams();

    //    CONFIGURATION

    const TENANT = '2779qdm3so5zlbx.sg.qlikcloud.com';
    const WEBINTEGRATIONID = 'itxFtCzTO3zH6QH0Asx0BCjVGcUF2FeT';
    const APPID = appId;
    const SHEETID = sheetId;
    const IDENTITY = null;
    const [login, setLogin] = useState(false);

    // const qlikLogin = async () => {
    //     try {
    //         const loggedIn = await fetch(`https://${TENANT}/api/v1/users/me`, {
    //             mode: 'cors',
    //             credentials: 'include',
    //             headers: {
    //                 'qlik-web-integration-id': WEBINTEGRATIONID,
    //             },
    //         });
    //         if (loggedIn.status !== 200) {
    //             if (sessionStorage.getItem('tryQlikAuth') === null) {
    //                 sessionStorage.setItem('tryQlikAuth', 1);
    //                 window.location = `https://${TENANT}/login?qlik-web-integration-id=${WEBINTEGRATIONID}&returnto=${window.location.href}`;
    //                 return await new Promise((resolve) =>
    //                     setTimeout(resolve, 100),
    //                 ); // prevents further code execution
    //             } else {
    //                 sessionStorage.removeItem('tryQlikAuth');
    //                 const message =
    //                     'Third-party cookies are not enabled in your browser settings and/or browser mode.';
    //                 alert(message);
    //                 throw new Error(message);
    //             }
    //         }
    //         sessionStorage.removeItem('tryQlikAuth');
    //         setLogin(true);
    //         return true;
    //     } catch (error) {}
    // };

    // const getQCSHeaders = async () => {
    //     const response = await fetch(`https://${TENANT}/api/v1/csrf-token`, {
    //         mode: 'cors',
    //         credentials: 'include',
    //         headers: {
    //             'qlik-web-integration-id': WEBINTEGRATIONID,
    //         },
    //     });

    //     const csrfToken = new Map(response.headers).get('qlik-csrf-token');
    //     return {
    //         'qlik-web-integration-id': WEBINTEGRATIONID,
    //         'qlik-csrf-token': csrfToken,
    //     };
    // };

    // const connectEnigma = async (qcsHeaders, appId, identity) => {
    //     const [session, app] = await getEnigmaSessionAndApp(
    //         appId,
    //         qcsHeaders,
    //         identity,
    //     );
    //     return [session, app];
    // };

    // const getEnigmaSessionAndApp = async (appId, headers, identity) => {
    //     const params = Object.keys(headers)
    //         .map((key) => `${key}=${headers[key]}`)
    //         .join('&');

    //     return (async () => {
    //         const schema = schemajson;
    //         try {
    //             return await createEnigmaAppSession(
    //                 schema,
    //                 appId,
    //                 identity,
    //                 params,
    //             );
    //         } catch {
    //             // If the socket is closed immediately following the connection this
    //             // could be due to an edge-case race condition where the newly created
    //             // user does not yet have access to the app due to access control propagation.
    //             // This bit of code will make another attempt after a 1.5 seconds.
    //             const waitSecond = await new Promise((resolve) =>
    //                 setTimeout(resolve, 1500),
    //             );
    //             try {
    //                 return await createEnigmaAppSession(
    //                     schema,
    //                     appId,
    //                     identity,
    //                     params,
    //                 );
    //             } catch (e) {
    //                 throw new Error(e);
    //             }
    //         }
    //     })();
    // };

    // async function createEnigmaAppSession(schema, appId, identity, params) {
    //     const session = enigma.create({
    //         schema,
    //         url: `wss://${TENANT}/app/${appId}/identity/${identity}?${params}`,
    //     });
    //     const enigmaGlobal = await session.open();
    //     const enigmaApp = await enigmaGlobal.openDoc(appId);
    //     return [session, enigmaApp];
    // }

    //    BONUS! DYNAMICALLY FETCH THEME

    // const getTheme = async (enigmaApp) => {
    //     const createAppProps = await enigmaApp.createSessionObject({
    //         qInfo: {
    //             qId: 'AppPropsList',
    //             qType: 'AppPropsList',
    //         },
    //         qAppObjectListDef: {
    //             qType: 'appprops',
    //             qData: {
    //                 theme: '/theme',
    //             },
    //         },
    //     });
    //     const appProps = await enigmaApp.getObject('AppPropsList');
    //     const appPropsLayout = await appProps.getLayout();
    //     const theme = appPropsLayout.qAppObjectList.qItems[0].qData.theme;
    //     return theme;
    // };

    //    HANDLE ENGINE SESSION CLOSURE

    // function handleDisconnect(session) {
    //     session.on('closed', () => {
    //         const message =
    //             '<Your text here> Due to inactivity or loss of connection, this session has ended.';
    //         document.getElementById('qlik_frame').style.display = 'none';
    //         document.getElementById('message').innerHTML = message; // replace with own handling
    //     });

    //     session.on('suspended', () => {
    //         const message =
    //             '<Your text here> Due to loss of connection, this session has been suspended.';
    //         document.getElementById('qlik_frame').style.display = 'none';
    //         document.getElementById('message').innerHTML = message;
    //     });

    //     window.addEventListener('offline', () => {
    //         session.close();
    //     });
    // }

    //    HELPER FUNCTION TO GENERATE IFRAME

    // function renderSingleIframe(frameId, appId, sheetId, theme, identity) {
    //     const frameUrl = `https://${TENANT}/single/?appid=${appId}&sheet=${sheetId}&theme=${theme}&identity=${identity}&opt=ctxmenu,currsel`;
    //     document.getElementById(frameId).setAttribute('src', frameUrl); // replace with own handling
    // }

    // const main = async () => {
    //     const isLoggedIn = await qlikLogin();
    //     const qcsHeaders = await getQCSHeaders();
    //     const [session, enigmaApp] = await connectEnigma(
    //         qcsHeaders,
    //         APPID,
    //         IDENTITY,
    //     );
    //     handleDisconnect(session);
    //     const theme = await getTheme(enigmaApp);
    //     renderSingleIframe('qlik_frame', APPID, SHEETID, theme, IDENTITY);
    //     const message =
    //         'Session will be automatically closed in 10 seconds to showcase the handling.';
    //     document.getElementById('message').innerHTML = message; // remove this after testing
    //     // setTimeout(() => {
    //     //     // remove this after testing
    //     //     session.close();
    //     // }, '10000');
    // };

    useEffect(() => {
        if (appId && sheetId) {
            setLogin(true);
        }
    }, [appId, sheetId]);

    return (
        <>
            {login ? (
                <div id="main">
                    <iframe
                        title="qlik"
                        src={`https://${TENANT}/single/?appid=${appId}&sheet=${sheetId}&theme=horizon&opt=ctxmenu,currsel%22`}
                        id="qlik_frame"
                        style={{
                            border: 'none',
                            width: '100%',
                            height: '92vh',
                        }}
                    ></iframe>
                </div>
            ) : (
                <ContainerLoader></ContainerLoader>
            )}
        </>
    );
}
