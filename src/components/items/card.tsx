import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router";
import styles from "./card.module.css";

type cardType = {
  id: string;
  imgSrc: string;
  title: string;
  total: number;
  stock: number;
  width?: string;
};

function Card({ id, imgSrc, title, total, stock, width = "300px" }: cardType) {
  const progress = (stock / total) * 100;
  const navigate = useNavigate();
  return (
    <div className={styles.Card} style={{ width: width }}>
      <img src={imgSrc} />
      <div
        className={styles.contents}
        onClick={() => navigate(`/market/${id}`)}
      >
        <h3 className={styles.title}>
          {title}
          <span className={styles.author}></span>
          {/* <LinearProgress
            className={styles.Progress}
            variant="determinate"
            value={progress}
          /> */}
        </h3>
      </div>
    </div>
  );
}

export default Card;
