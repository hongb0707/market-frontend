import axios from "axios";

export const uploadfiles = async (files: Blob[]): Promise<boolean> => {
  if (files.length === 0) return false;

  const data = new FormData();
  files.forEach((file) => {
    data.append("image", file);
  });

  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}item-info/images`,
    data
  );
  if (res.status === 201) return true;
  return false;
};
