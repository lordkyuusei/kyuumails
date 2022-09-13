import { createEffect, createSignal } from 'solid-js';
import { mail } from '@/lib/store/mail';
import styles from './index.module.css';

const MailPreview = (props: any) => {
    const { id, subject, from, date, preview, isRead, onClick } = props;
    const [selected, setSelected] = createSignal(false);

    const rtf = new Intl.RelativeTimeFormat('fr', { style: 'narrow' });
    const sentDate = new Date(date);

    const displayDate = (Date.now() - sentDate.getTime()) < 86400000 ?
        `Il y a ${rtf.format(Math.round((Date.now() - sentDate.getTime()) / 3600000), 'hour')}` :
        sentDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const summary = preview.slice(0, 147).padEnd(150, '...');

    createEffect(() => {
        setSelected(mail.id === id);
    }, [mail])

    return (
        <section onClick={onClick} classList={{ [styles["mail-preview__new"]]: !isRead, [styles["mail-preview"]]: true, [styles["mail-preview__selected"]]: selected() }}>
            <header class={styles["mail-preview__header"]}>
                <h1 class={styles["mail-preview__header__from"]}>{from}</h1>
                <span class={styles["mail-preview__header__subject"]}>{subject}</span>
            </header>
            <div class={styles["mail-preview__body"]}>
                {summary}
            </div>
            <footer class={styles["mail-preview__footer"]}>
                <span class={styles["mail-preview__footer__date"]}>{displayDate}</span>
            </footer>
        </section>
    )
}

export default MailPreview;