import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ContainerLoader from '../../components/loader/container-loader';
import AzureLogin from '../auth/AzureLogin';
import AuthenticateRoute from './AuthenticateRoute';
import RedirectIfAuthenticatedRoute from './RedirectIfAuthenticatedRoute';
import { RouteKeys } from './route-keys';
import AddUser from '../../components/add-user/addUser';
import Themes from '../../components/themes/themes';

import DataSource from '../../components/table/data-source/datasource';
import Admin from '../config/admin';
import { AppProvider } from '../../components/context/Global';
import Model from '../Model/Model';

const AddVariable = lazy(() => import('../../components/keyPairs/addVariable'));

const NotFound = lazy(() => import('../notfound'));
const AuthPage = lazy(() => import('../auth'));
const CreateUser = lazy(() => import('../../components/Crud/CreateUser'));
const EditUser = lazy(() => import('../../components/Crud/EditUser'));
const ViewDataSource = lazy(() =>
    import('../../components/ViewDataSource/viewDataSource'),
);

const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const Home = lazy(() => import('../home/Home'));
const Qlik = lazy(() => import('../qlikDashboard/qlikDashboard'));

const Volume = lazy(() => import('../../components/volume/volume'));

const SchemaAnamoly = lazy(() =>
    import('../../components/schema_anamoly/schema_anamoly'),
);

class NavRoutes extends React.Component {
    render() {
        return (
            <Suspense fallback={<ContainerLoader />}>
                <Routes>
                    <>
                        <Route
                            path={RouteKeys.ViewDataSource}
                            element={
                                <AuthenticateRoute>
                                    <ViewDataSource />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <AuthenticateRoute>
                                    <AuthPage />
                                </AuthenticateRoute>
                            }
                        />

                        <Route
                            path={RouteKeys.Themes}
                            element={
                                <AuthenticateRoute>
                                    <Themes />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.Home}
                            element={
                                <AuthenticateRoute>
                                    <AppProvider>
                                        <Home />
                                    </AppProvider>
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.AddUser}
                            element={
                                <AuthenticateRoute>
                                    <AddUser />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.Volume}
                            element={
                                <AuthenticateRoute>
                                    <Volume />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.SchemaAnamoly}
                            element={
                                <AuthenticateRoute>
                                    <SchemaAnamoly />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.Auth}
                            element={
                                <RedirectIfAuthenticatedRoute>
                                    <AuthPage />
                                </RedirectIfAuthenticatedRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.AzureLogin}
                            element={
                                <RedirectIfAuthenticatedRoute>
                                    <AzureLogin />
                                </RedirectIfAuthenticatedRoute>
                            }
                        />

                        <Route
                            path={RouteKeys.CreateUser}
                            element={
                                <AuthenticateRoute>
                                    <CreateUser />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.EditUser}
                            element={
                                <AuthenticateRoute>
                                    <EditUser />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.AddVariable}
                            element={
                                <AuthenticateRoute>
                                    <AddVariable />
                                </AuthenticateRoute>
                            }
                        />

                        <Route
                            path={RouteKeys.Dashboard}
                            element={
                                <AuthenticateRoute>
                                    <AppProvider>
                                        <Dashboard />
                                    </AppProvider>
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.DataSource}
                            element={
                                <AuthenticateRoute>
                                    <DataSource />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.Qlik}
                            element={
                                <AuthenticateRoute>
                                    <Qlik />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path="/config"
                            element={
                                <AppProvider>
                                    <AuthenticateRoute>
                                        <Admin />
                                    </AuthenticateRoute>
                                </AppProvider>
                            }
                        />

                        <Route path={RouteKeys.NotFound} element={NotFound} />
                        <Route path="*" element={NotFound} />
                    </>
                </Routes>
            </Suspense>
        );
    }
}

export default NavRoutes;
