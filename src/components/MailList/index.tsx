import { getMail, getMails } from "@/lib/services/office365/msal";
import { mail, setMail } from "@/lib/store/mail";
import { mails } from "@/lib/store/mail";
import { For, Show } from "solid-js";
import MailPreview from "../MailPreview";
import styles from './index.module.css';

const requestMail = async (id: string) => {
    const mail = await getMail(id);
    setMail(mail);
}

const MailList = () => {
    return (
        <Show when={mails.length > 0} fallback={<></>}>
            <section class={styles["mail__list"]}>
                <For each={mails}>{(_mail) =>
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
            </section>
        </Show>
    )
}

export default MailList;