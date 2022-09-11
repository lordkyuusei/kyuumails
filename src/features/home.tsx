import Header from "@/components/Header"
import FolderList from "@/components/FolderList";
import MailList from "@/components/MailList";
import Mail from "@/components/Mail";

export default () => {
    return (
        <>
            <Header />
            <div style="display: flex">
                <FolderList />
                <MailList />
                <Mail />
            </div>
        </>
    )
}