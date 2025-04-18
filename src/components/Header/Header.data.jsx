import { Home } from "lucide-react";
import styles from './Header.module.css';
import { PageRoutes } from "../../constans/PageRoutes";

export const headerData = [
    {
        label: "Home",
        path: PageRoutes.COMMON.MAIN,
        icon: <Home className={styles.navIcon} />,
        activeRoutes: [PageRoutes.COMMON.MAIN],
    },
]