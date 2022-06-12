import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "../../components/banner/banner";
import Card from "../../components/items/card";
import styles from "./home.module.css";
function Home() {
  const [items, setItems]: any = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchItems = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}item?user=false&page=1&take=12`
    );
    if (response.status === 200) {
      setItems(response.data);
      setLoading(false);
    } else {
      console.log("데이터 가져오기 실패");
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <article>
      <Banner />
      <section className={styles.smallBanner}>
        <div>
          <span>안전한 투자 & 효과적인 디지털 거래</span>
          <Button variant="contained" sx={{ borderRadius: "10px" }}>
            Eplore
          </Button>
        </div>
      </section>
      <section className={styles.section1}>
        <h1>market</h1>
        <div className={styles.gridContainer}>
          {isLoading ? (
            <div>loading</div>
          ) : (
            items.map((item: any) => (
              <Card
                key={item.id}
                id={item.id}
                imgSrc={item.image_path}
                stock={item.stock}
                title={item.name}
                total={item.total_amount}
              />
            ))
          )}
        </div>
      </section>
    </article>
  );
}

export default Home;
