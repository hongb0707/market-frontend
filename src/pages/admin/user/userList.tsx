import { Button } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CustomDataGrid from "../../../components/data/dataGrid";
import { getCookie } from "../../../util/cookie";
import styles from "./userList.module.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const token = useRef<string>();
  const columns: GridColumns<any> = [
    {
      field: "name",
      width: 200,
    },
    {
      field: "email",
      width: 300,
    },
    {
      field: "type",
      width: 100,
    },
    {
      field: "created_at",
      width: 300,
    },
    {
      field: "detail",
      width: 300,
    },
  ];
  const fetchUsers = async () => {
    const userData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}user`,
      {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      }
    );
    if (userData.status === 200) setUsers(userData.data);
  };

  useEffect(() => {
    token.current = getCookie("access_token");
    fetchUsers();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <article className={styles.article + " c_box"}>
          <CustomDataGrid rows={users} columns={columns} pageSize={10} />
        </article>
      </div>
    </div>
  );
}

export default UserList;
