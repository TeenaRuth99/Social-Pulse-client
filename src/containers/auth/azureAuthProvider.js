// authProvider.js
import { LoginType, MsalAuthProvider } from 'react-aad-msal';
/**
 * @function
 * @returns {MsalAuthProvider} - an instance of MsalAuthProvider
 * @description getAuthProvider is a function that returns a new instance of the MsalAuthProvider class from the "react-aad-msal" library.
 *  The MsalAuthProvider class is used to handle authentication with Azure Active Directory (AAD)
 *  This function takes the environment variables of `AZURE_AD_TENANT_ID` and `AZURE_AD_CLIENT_ID` and uses it to configure the MSAL library
 *  The function also sets up the Authentication parameters and options
 */
export const getAuthProvider = () => {
    // Msal Configurations
    const config = {
        auth: {
            authority:
                'https://login.microsoftonline.com/b8869792-ee44-4a05-a4fb-b6323a34ca35',
            clientId: `${process.env.REACT_APP_AZURE_AD_CLIENT_ID}`,
            //'http://localhost:3001/auth/aad-redirect',
            redirectUri: `${window.location.origin}/auth/aad-redirect`,
            navigateToLoginRequestUrl: false,
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: false,
        },
    };
    // Authentication Parameters
    const authenticationParameters = {
        scopes: ['User.Read', 'User.ReadBasic.All', 'profile'],
        forceRefresh: false,
    };

    // Options
    const options = {
        loginType: LoginType.Redirect,
        // tokenRefreshUri: window.location.origin + '/auth.html',
    };
     console.log(config);
    return new MsalAuthProvider(config, authenticationParameters, options);
};
