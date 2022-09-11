import { createEffect, createSignal } from 'solid-js';
import { mail } from '@/lib/store/mail';
import styles from './index.module.css';

const MailPreview = (props: any) => {
    const { id, subject, from, date, preview, isRead, onClick } = props;

    const [selected, setSelected] = createSignal(false);

    createEffect(() => {
        setSelected(mail.id === id);
    }, [mail])

    return (
        <section onClick={onClick} classList={{ [styles["mail-preview__new"]]: !isRead, [styles["mail-preview"]]: true, [styles["mail-preview__selected"]]: selected() }}>
            <header class={styles["mail-preview__header"]}>
                <h2 class={styles["mail-preview__header__title"]}>{subject}</h2>
            </header>
            <div class={styles["mail-preview__body"]}>
                {preview}
            </div>
            <footer class={styles["mail-preview__footer"]}>
                <span class={styles["mail-preview__footer__from"]}>{from}</span>
                <span class={styles["mail-preview__footer__date"]}>{date}</span>
            </footer>
        </section>
    )
}

export default MailPreview;