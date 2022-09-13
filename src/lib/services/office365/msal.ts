import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest, tokenRequest, graphConfig } from "./config";
import { account, setAccount } from "@/lib/store/account";

const msalObj = new PublicClientApplication(msalConfig);

const selectAccount = () => {
    const accounts = msalObj.getAllAccounts();

    if (accounts.length === 0) return null;
    if (accounts.length === 1) {
        setAccount("hotmail", "data", accounts[0]);
        return accounts[0];
    }

    console.warn("Multiple accounts detected. Please select an account.");
}

const handleResponse = (response: any) => {
    if (response !== null) {
        return response.account;
    } else {
        return selectAccount();
    }
}

const getTokenPopup = async (request: any) => {
    request.account = selectAccount()?.username;
    try {
        const response = await msalObj.acquireTokenSilent(request);
        return response.accessToken;
    } catch (err) {
        const response = await msalObj.acquireTokenPopup(request);
        return response.accessToken;
    }
}

const callMSGraph = async (endpoint: string, token: string) => {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    const response = await fetch(endpoint, options);
    return await response.json();
}

export const login = async () => {
    const response = await msalObj.loginPopup(loginRequest);
    return handleResponse(response);
}

export const logout = () => {
    const account = selectAccount();
    const request = {
        account: msalObj.getAccountByUsername(account?.username || "MOI"),
        postLogoutRedirectUri: "http://localhost:3000",
        mainWindowRedirectUri: "http://localhost:3000"
    };

    msalObj.logoutPopup(request);
}

export const getMailsFromFolder = async (id: string) => {
    const token = await getTokenPopup(tokenRequest);
    const endpoint = `${graphConfig.graphMailFolderEndpoint}/${id}/messages`;
    return await callMSGraph(endpoint, token);
}

export const getMails = async () => {
    const token = await getTokenPopup(tokenRequest);
    return callMSGraph(graphConfig.graphMailEndpoint, token);
}

export const getMail = async (id: string) => {
    const token = await getTokenPopup(tokenRequest);
    return callMSGraph(`${graphConfig.graphMailEndpoint}/${id}`, token);
}

export const getProfile = async () => {
    const token = await getTokenPopup(tokenRequest);
    return callMSGraph(graphConfig.graphMeEndpoint, token);
};

export const getFolders = async () => {
    const token = await getTokenPopup(tokenRequest);
    return callMSGraph(graphConfig.graphMailFolderEndpoint, token);
}