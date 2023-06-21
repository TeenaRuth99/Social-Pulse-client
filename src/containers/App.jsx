import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import NavRoutes from './routes/Routes';
import { AppProvider } from '../components/context/Global';

const App = () => {
    return (
        <>
            <AppProvider>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-center"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar={true}
                />
                <NavRoutes />
            </AppProvider>
        </>
    );
};

export default App;
