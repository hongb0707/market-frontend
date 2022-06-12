import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "../../../util/cookie";
import styles from "./addItem.module.css";

function AddItem() {
  const [mainImage, setMainImage]: any = useState();
  const [imageBase64, setImageBase64] = useState("");
  const itemInfo: any = useRef();
  const imageUploaded: any = useRef(false);
  const token: any = useRef();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    // iteminfo 추가
    if (e.target.files !== null) {
      itemInfo.current = {
        ...itemInfo.current,
        [e.target
          .name]: `${process.env.REACT_APP_BACKEND_IMG_URL}items/${e.target.files[0].name}`,
      };
    }
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImageBase64(base64.toString());
      }
    };
    if (e.target.files !== null && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setMainImage(e.target.files[0]);
    }
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("image", mainImage);
    const result = await axios.post("http://localhost:3000/item/images", data);

    if (result.status === 201) {
      imageUploaded.current = true;
    } else {
      imageUploaded.current = false;
    }
  };
  const submitInfo = async () => {
    try {
      if (imageUploaded.current) {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}item`,
          itemInfo.current,
          {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          }
        );
        if (result.status === 201) {
          alert("등록 완료");
          window.location.reload();
        }
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        alert("등록 오류(500)");
      }
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    itemInfo.current = { ...itemInfo.current, [e.target.name]: e.target.value };
  };

  useEffect(() => {
    token.current = getCookie("access_token");
  }, []);
  return (
    <article className={styles.article}>
      <section className={styles.inputSection}>
        <div className={styles.previewBox}>
          <img
            className={styles.preview}
            src={imageBase64 ? imageBase64 : "/images/default-placeholder.png"}
            alt="preview-main-img"
          />
        </div>
        <div>
          <form>
            <div className={styles.file}>
              <label htmlFor="input-file" className={styles.bubbleShadow}>
                {mainImage ? mainImage.name : "이미지 선택"}
              </label>
              <input
                type="file"
                id="input-file"
                name="image_path"
                accept="image/jpeg,image/jpg"
                required
                onChange={(e) => onFileChange(e)}
              />
            </div>
            <div className={styles.textInputBox}>
              <input
                type="text"
                name="name"
                className={styles.bubbleShadow}
                placeholder="제목"
                required
                spellCheck={false}
                onChange={onInputChange}
              />
              <input
                type="text"
                name="price"
                className={styles.bubbleShadow}
                placeholder="가격"
                required
                spellCheck={false}
                onChange={onInputChange}
              />
              <input
                type="text"
                name="stock"
                className={styles.bubbleShadow}
                placeholder="재고"
                required
                spellCheck={false}
                onChange={onInputChange}
              />
              <input
                type="text"
                name="total_amount"
                className={styles.bubbleShadow}
                placeholder="총량"
                required
                spellCheck={false}
                onChange={onInputChange}
              />
              <Button
                className={styles.submit}
                variant="contained"
                onClick={async () => {
                  await uploadImage();
                  await submitInfo();
                }}
              >
                등록
              </Button>
            </div>
          </form>
        </div>
      </section>
      <section className={styles.detailSection}></section>
    </article>
  );
}

export default AddItem;
