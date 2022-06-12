import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./banner.module.css";

function Banner() {
  const settings = {
    infinite: true,
    speed: 1500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 10000,
    autoplay: true,
    fade: true,
  };
  return (
    <Slider {...settings} className={styles.slider}>
      <div>
        <img src="https://investmkt.co.kr/images/home/main2.jpg" />
      </div>
      <div>
        <img src="https://investmkt.co.kr/images/home/main.png" />
      </div>
    </Slider>
  );
}

export default Banner;
