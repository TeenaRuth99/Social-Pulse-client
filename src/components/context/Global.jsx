import { createContext, useContext, useState } from 'react';
import { data } from '../../helper/data';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [login, setlogin] = useState(false);
    const [isadmin, setisadmin] = useState(false);
    const [history, sethistory] = useState(false);
    const [start_date, setstart_date] = useState(null);
    const [selectedval, setselectedval] = useState([]);
    const [command, setcommand] = useState(false);

    const [src, setsrc] = useState([]);
    const [isLoadingbtn, setisLoadingbtn] = useState(false);
    const uniqueStream = [];

    data.map((item) => {
        item.stream.map((stream) => {
            if (uniqueStream.indexOf(stream) === -1) {
                uniqueStream.push(stream);
            }
        });
    });
    const [currentItem, setCurrentItem] = useState(uniqueStream[0]);

    const [options, setOptions] = useState([]);

    const [timOptions, setTimOptions] = useState([]);

    let [submitBtnName, setSubmitBtnName] = useState();
    let [token, settoken] = useState({});

    var uniqueheader = [];

    data.map((item) => {
        if (uniqueheader.indexOf(item.header) === -1) {
            uniqueheader.push(item.header);
        }
    });

    return (
        <AppContext.Provider
            value={{
                currentItem,

                setCurrentItem,

                uniqueStream,

                options,

                setOptions,

                timOptions,

                setTimOptions,

                submitBtnName,

                setSubmitBtnName,
                setlogin,
                login,
                isadmin,
                setisadmin,
                token,
                settoken,
                history,
                sethistory,
                selectedval,
                setselectedval,
                start_date,
                setstart_date,
                command,
                setcommand,

                src,
                setsrc,
                isLoadingbtn,
                setisLoadingbtn,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
