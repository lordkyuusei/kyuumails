import { mail } from "@/lib/store/mail";
import { createEffect, Show } from "solid-js";
import styles from './index.module.css';

const Mail = () => {
    createEffect(() => {
        console.log(mail)
    }, [mail])

    return (
        <Show when={mail.id !== "0"} fallback={<></>}>
            <section class={styles["mail__unit"]}>
                <iframe class={styles["unit__content"]} srcdoc={mail.body.content} />
            </section>
        </Show>
    )
}


export default Mail;