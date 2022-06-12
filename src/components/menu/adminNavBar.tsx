import { Link } from "react-router-dom";
import styles from "./adminNavBar.module.css";

function AdminNavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>invest market</div>
      <ul>
        <li>
          <Link to="#">DashBoard</Link>
        </li>
        <li>
          <ul className={styles.dropDown}>
            <span className={styles.navElement}>User</span>
            <li className={styles.dropHide}>
              <Link to="/admin/user/list">list</Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className={styles.dropDown}>
            <span className={styles.navElement}>Items</span>
            <li className={styles.dropHide}>
              <Link to="/admin/item/list">list</Link>
            </li>
            <li className={styles.dropHide}>
              <Link to="/admin/item/add">add</Link>
            </li>
            <li className={styles.dropHide}>
              <Link to="/admin/item/info">add infomation</Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className={styles.dropDown}>
            <span className={styles.navElement}>post</span>
            <li className={styles.dropHide}>
              <Link to="#">Notice</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavBar;
