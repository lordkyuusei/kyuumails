import { createStore } from "solid-js/store";

const template: any[] = [];
export const [mails, setMails] = createStore(template);
export const [mail, setMail] = createStore({
    id: "0",
    subject: "",
    from: "",
    cc: [],
    cci: [],
    body: ""
})