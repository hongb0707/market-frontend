import { Button, TextField } from "@mui/material";
import styles from "./login.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { setCookie } from "../../util/cookie";
import { AuthProtect } from "../../util/getUserInfo";
import { useNavigate } from "react-router";

function Login() {
  const [isLoginError, setLoginError] = useState(false);
  const submitData = useRef({});
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    submitData.current = {
      ...submitData.current,
      [e.target.name]: e.target.value,
    };
  };
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const user = await axios.post(
        "http://localhost:3000/auth/login",
        submitData.current
      );
      if (user) {
        setLoginError(false);
      }
      const accessToken = user.data.access_token;
      setCookie("access_token", accessToken);
      window.location.reload();
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        setLoginError(true);
      }
    }
  };

  useEffect(() => {
    AuthProtect().then((res) => {
      if (res.status === true) {
        navigate("/");
      }
    });
  }, []);
  return (
    <article className={styles.article}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.login}
      >
        <h1>log in</h1>
        <span className={styles.error}>
          {" "}
          {isLoginError ? "아이디 또는 비밀번호를 확인해주세요." : ""}
        </span>

        <TextField
          error={isLoginError}
          size="small"
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          error={isLoginError}
          size="small"
          name="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => handleChange(e)}
        />
        <Button className={styles.submit} variant="contained" onClick={submit}>
          Log in
        </Button>
      </motion.section>
    </article>
  );
}

export default Login;
