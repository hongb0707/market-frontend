import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../../util/cookie";
import styles from "./itemlist.module.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
function ItemList() {
  const token: any = useRef();
  const [items, setItems] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchItems = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}item?user=false`,
      {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      }
    );
    if (response.status === 200) {
      setItems(response.data);
      setLoading(false);
    } else {
      console.log("데이터 가져오기 실패");
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      return null;
    }
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}item/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      }
    );
    if (response.status === 200) {
      alert("삭제 성공");
      window.location.reload();
    } else {
      console.log("데이터 가져오기 실패");
    }
  };

  useEffect(() => {
    token.current = getCookie("access_token");
    fetchItems();
  }, []);
  return (
    <>
      {isLoading ? (
        <article>Loadging...</article>
      ) : (
        <article className={styles.article}>
          <div className={styles.container}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", background: "none" }}
            >
              <Table
                sx={{
                  minWidth: 650,
                  background: "none",
                  "& td": {
                    color: "#f7f7f7",
                    fontSize: "1em",
                    fontWeight: "500",
                    borderColor: "#bbb",
                    borderWidth: "2px",
                  },
                  "& th": {
                    color: "#7eb3e1",
                    fontSize: "1.1em",
                    fontWeight: "600",
                    borderColor: "#bbb",
                    borderWidth: "2px",
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell align="center">image</TableCell>
                    <TableCell align="right">price</TableCell>
                    <TableCell align="right">stock</TableCell>
                    <TableCell align="right">created at</TableCell>
                    <TableCell align="right">delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item: any) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell scope="row">{item.name}</TableCell>
                      <TableCell align="center">
                        <img className={styles.image} src={item.image_path} />
                      </TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.stock}</TableCell>
                      <TableCell align="right">{item.created_at}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() => deleteItem(item.id)}
                        >
                          delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </article>
      )}
    </>
  );
}

export default ItemList;
