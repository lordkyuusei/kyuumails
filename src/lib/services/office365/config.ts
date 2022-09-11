import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "dd244697-b2c6-4eb4-acae-f64d837d790b",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/api/oauth"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: number, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
}

export const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false
}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphMailFolderEndpoint: "https://graph.microsoft.com/v1.0/me/mailFolders"
}