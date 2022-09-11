import { login, logout } from "@/lib/services/office365/msal";
import styles from "./index.module.css";

const Header = () => (
    <header class={styles.header}>
        <button class={styles["mail__new-message"]}>Nouveau message</button>
        <div class={styles["mail__options"]}>
            <button class="option">🔍 Rechercher</button>
        </div>
        <div class={styles["mail__buttons"]}>
            <button class="mail-button">📥</button>
            <button class="mail-button">📤</button>
            <button class="mail-button">📧</button>
            <button class="mail-button" onClick={login}>🧟‍♀️</button>
            <button class="logout" onClick={logout}>🚪</button>
        </div>
    </header>
)

export default Header;