import { createStore } from "solid-js/store";

export const [mails, setMails] = createStore([]);
export const [mail, setMail] = createStore({
    id: "0",
    subject: "",
    from: "",
    cc: [],
    cci: [],
    body: ""
})