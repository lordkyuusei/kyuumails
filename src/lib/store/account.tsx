import { createStore } from "solid-js/store";

export const [account, setAccount] = createStore({
    "hotmail": { data: {} },
    "gmail": { data: {} },
    "office": { data: {} },
});