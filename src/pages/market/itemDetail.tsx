import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./itemDetail.module.css";

function ItemDetail() {
  const { id } = useParams();
  const [isLoad, setLoad] = useState(true);
  const [item, setItem] = useState<any>();
  const fetchItem = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}item/${id}`
    );
    setItem(response.data);
    setLoad(false);
    console.log(response.data);
  };

  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <article className={styles.article}>
      {isLoad ? (
        <div>loading</div>
      ) : (
        <section>
          <div>
            <img src={item.image_path} />
          </div>
        </section>
      )}
    </article>
  );
}

export default ItemDetail;
