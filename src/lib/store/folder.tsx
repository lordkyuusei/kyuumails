import { createStore } from "solid-js/store";

export const [folders, setFolders] = createStore([]);
export const [folder, setFolder] = createStore({
    id: "0",
    displayName: "",
    unreadItemCount: 0
});