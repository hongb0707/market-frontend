import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import styles from "./footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.section}>
        <div className={styles.logo}>
          <span>invest market</span>
        </div>
        <div className={styles.contents}>
          <ul>
            <li>공지사항</li>
            <li>이용안내</li>
            <li>FAQ</li>
          </ul>
          <div>
            <div>
              주소: 서울특별시 서초구 서초대로 396, 17층 V490호(서초동,
              강남빌딩)
            </div>
            <div>사업자 등록 번호: 229-88-02117</div>
            <div>대표: 홍영기</div>
          </div>
          <div className={styles.footerNotice}>
            TS&P 페이지 내 노출되는 모든 콘텐츠 정보는 발행인이 제공하고 있으며,
            투자 또는 거래의 권유 목적으로 거래하지 않습니다. 해당 정보는 서비스
            이용을 위한 보조자료를 참조해 주시기 바랍니다.
          </div>
        </div>
        <div className={styles.contact}>
          <div>
            <EmailRoundedIcon fontSize="small" />
            <span className={styles.email}>tsnpinvestmarket@gmail.com</span>
          </div>
          <div>ⓒ TS&P Corp.</div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
