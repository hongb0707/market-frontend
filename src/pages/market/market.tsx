import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/items/card";
import { getCookie } from "../../util/cookie";
import styles from "./market.module.css";

function Market() {
  const token = useRef<string>();
  const [items, setItems] = useState<[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}item?user=true`,
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
  const fetchItems = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}item?user=true`,
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
  useEffect(() => {
    token.current = getCookie("access_token");
    fetchItems();
  }, []);

  return (
    <div style={{ paddingTop: "63px", display: "flex" }}>
      <article className={styles.article}>
        <header className={styles.authors}>123</header>
        <div className={styles.container}>
          <aside className={styles.aside}>
            <div className="c_box"></div>
          </aside>
          <section className={styles.itemSection} role="grid">
            {isLoading ? (
              <div>loading</div>
            ) : (
              items.map((item: any) => (
                <Card
                  width="200px"
                  key={item.id}
                  id={item.id}
                  imgSrc={item.image_path}
                  stock={item.stock}
                  title={item.name}
                  total={item.total_amount}
                />
              ))
            )}
          </section>
        </div>
      </article>
    </div>
  );
}

export default Market;
