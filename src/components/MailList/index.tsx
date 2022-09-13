import { createEffect, createSignal, For, Show } from "solid-js";

import MailPreview from "../MailPreview";
import styles from './index.module.css';

import { mails } from "@/lib/store/mail";
import { setMail } from "@/lib/store/mail";
import { getMail } from "@/lib/services/office365/msal";

const requestMail = async (id: string) => {
    const mail = await getMail(id);
    setMail(mail);
}

const MailList = () => {
    const template: { [key: string]: any[] } = { "": [] };
    const [mailsList, setMailsList] = createSignal(template);

    createEffect(() => {
        const mailsByDate: { [key: string]: any[] } = mails.reduce((acc, mail) => {
            const date = new Date(mail.sentDateTime).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(mail);
            return acc;
        }, {} as { [key: string]: any[] });

        setMailsList(mailsByDate);
    }, [mails]);

    return (
        <Show when={mails.length > 0} fallback={<></>}>
            <section class={styles["mail__list"]}>
                <For each={Object.keys(mailsList())}>
                    {(date) => (
                        <>
                            <h1 class={styles["mail__date"]}>{date}</h1>
                            <For each={mailsList()[date]}>{(_mail) =>
                                <MailPreview
                                    isRead={_mail.isRead}
                                    id={_mail.id}
                                    subject={_mail.subject}
                                    preview={_mail.bodyPreview}
                                    date={_mail.sentDateTime}
                                    from={_mail.from.emailAddress.name}
                                    onClick={async () => await requestMail(_mail.id)}
                                />
                            }</For>
                        </>
                    )}</For>
            </section>
        </Show>
    )
}

export default MailList;