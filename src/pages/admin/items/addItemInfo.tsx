import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./addItemInfo.module.css";
import { Button, Pagination } from "@mui/material";
import { uploadfiles } from "../../../util/file/upload";
import { type } from "@testing-library/user-event/dist/type";

type updateType = {
  itemId: string;
  image_path: string;
  sequence: number;
};
function AddItemInfo() {
  const [itemData, setItemData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const currentPage = useRef<number>(1);
  const [chekcedItem, setCheckedItem] = useState<string[]>([]);
  const [imagesBase64, setImagesBase64] = useState<string[]>([]);
  const [mainImages, setMainImages] = useState<any[]>([]);
  const updateData = useRef<updateType[]>([]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let result: Blob[] = [];
    let preview: string[] = [];
    // 메인이미지에 업데이트
    if (e.target.files !== null && e.target.files[0]) {
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = new FileReader();
        await reader.readAsDataURL(e.target.files[i]);
        reader.onloadend = () => {
          let base64 = reader.result;
          if (base64) preview.push(base64.toString());
        };
        result.push(e.target.files[i]);
        if (i === e.target.files.length - 1) {
          reader.onloadend = () => {
            setImagesBase64(preview);
            setMainImages(result);
          };
        }
      }
    }
  };
  const fetchItems = async () => {
    const items: any = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}item?user=true&page=${currentPage.current}&take=14`
    );
    setItemData(items.data);
    setLoading(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedItem([...chekcedItem, e.target.name]);
    } else {
      setCheckedItem(
        chekcedItem.filter((chekced) => chekced !== e.target.name)
      );
    }
  };
  const handlepageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    currentPage.current = page;
    fetchItems();
  };
  const onSubmit = async () => {
    if (chekcedItem.length === 0) {
      window.alert("선택된 아이템이 없습니다.");
      return null;
    }
    // 아이템 정보 파일들 업로드
    const fileRes = uploadfiles(mainImages);
    if (!fileRes) {
      alert("파일 업데이트 오류");
      return null;
    }
    // 아이템과 정보 db 업로드
    createUpdateObj(mainImages, chekcedItem);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}item-info`,
      updateData.current
    );

    if (res.status === 201) {
      alert("등록 완료");
      window.location.reload();
    }
  };
  const createUpdateObj = (images: any[], checkedItems: string[]) => {
    const path = `${process.env.REACT_APP_BACKEND_URL}images/item-info/`;

    checkedItems.forEach((item) => {
      images.forEach((image, key) => {
        updateData.current = [
          ...updateData.current,
          { itemId: item, image_path: path + image.name, sequence: key + 1 },
        ];
      });
    });
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <article className={styles.article}>
      <section className={styles.add}>
        <div className={styles.previewBox}>
          {imagesBase64.length === 0 ? (
            <img
              src="/images/default-placeholder.png"
              className={styles.previewdefault}
            />
          ) : (
            imagesBase64.map((image64, key) => (
              <img key={key} src={image64} className={styles.preview} />
            ))
          )}
        </div>
        <div className={styles.iteminfoimagebox}>
          <label htmlFor="filesinput">
            파일 업로드
            <input
              id="filesinput"
              type="file"
              style={{ display: "none" }}
              accept="image/jpeg,image/jpg"
              onChange={onFileChange}
              multiple
            />
          </label>
          <Button
            sx={{
              width: "270px",
              margin: "auto",
            }}
            variant="contained"
            onClick={() => onSubmit()}
          >
            등록
          </Button>
        </div>
      </section>
      <section className={styles.items}>
        <div className={styles.itemListNav}>
          <Pagination
            count={10}
            page={currentPage.current}
            onChange={(e, page) => handlepageChange(e, page)}
          />
        </div>
        {isLoading ? (
          <div>loading</div>
        ) : (
          itemData.map((item: any) => (
            <div
              key={item.id}
              className={styles.card}
              style={
                chekcedItem.includes(item.id)
                  ? { opacity: 1 }
                  : { opacity: 0.5 }
              }
            >
              <label htmlFor={item.id}>
                <img src={item.image_path} />
              </label>
              <input
                id={item.id}
                type="checkbox"
                name={item.id}
                onChange={(e) => handleChange(e)}
              />
              <div className={styles.describtion}>
                {item.name}
                <span>{item.User.name}</span>
              </div>
            </div>
          ))
        )}
      </section>
    </article>
  );
}

export default AddItemInfo;
