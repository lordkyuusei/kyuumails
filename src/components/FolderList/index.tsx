import { getFolders, getMailsFromFolder } from "@/lib/services/office365/msal";
import { setMails } from "@/lib/store/mail";
import { createEffect, createSignal, For } from "solid-js";

import styles from './index.module.css';

const FolderList = () => {
    const [folders, setFolders] = createSignal([]);
    const [selected, setSelected] = createSignal("");

    const requestMails = async (id: string) => {
        setSelected(id);
        const mails = await getMailsFromFolder(id);
        setMails(mails.value);
    }

    createEffect(async () => {
        const folders = await getFolders();
        setFolders(folders.value);
    });

    createEffect(async () => {
        if (folders().length > 0) {
            const id = folders().find((folder: any) => ["Inbox", "Boîte de réception"].includes(folder.displayName))?.id ?? "0";
            const mails = await getMailsFromFolder(id);
            setSelected(id);
            setMails(mails.value);
        }
    }, [folders]);

    return (
        <section class={styles["folder__list"]}>
            <ul>
                <For each={folders()}>{(folder) =>
                    <>
                        <li classList={{ [styles["folder__list-item-desktop"]]: true, [styles["list__selected"]]: selected() === folder.id }} onClick={() => requestMails(folder.id)}>
                            <span>
                                {folder.displayName}
                            </span>
                            <span>
                                {folder.unreadItemCount}
                            </span>
                        </li>
                        <li classList={{ [styles["folder__list-item-mobile"]]: true, [styles["list__selected"]]: selected() === folder.id }} onClick={() => requestMails(folder.id)} title={`${folder.displayName}`}>
                            <button>📧</button>
                        </li>
                    </>
                }</For>
            </ul>
        </section>
    )
};

export default FolderList;