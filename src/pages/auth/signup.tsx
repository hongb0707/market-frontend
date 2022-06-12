import { Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../../util/cookie";
import styles from "./signup.module.css";

type submit = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
};
function SignUp() {
  const [isPasswordError, setPasswordError] = useState(false);
  const [isExistIdError, setExistIdError] = useState(false);
  const submitData = useRef<submit>({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (isExistIdError && e.target.name === "email") {
      setExistIdError(false);
    }
    submitData.current = {
      ...submitData.current,
      [e.target.name]: e.target.value,
    };
    if (submitData.current.password !== submitData.current.passwordCheck) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { passwordCheck, ...updateData } = submitData.current;
      const user = await axios.post("http://localhost:3000/user", updateData);
      if (user) {
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response.data.error === "110") {
        setExistIdError(true);
      }
    }
  };
  useEffect(() => {
    if (getCookie("access_token")) {
      navigate("/");
    }
  }, []);
  return (
    <article className={styles.article}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.signup}
      >
        <h1>sign up</h1>
        <form className={styles.signupBox} onSubmit={(e) => submit(e)}>
          <span className={styles.error}>
            {" "}
            {isPasswordError ? "비밀번호가 서로 다릅니다." : ""}
            {isExistIdError ? "이미 존재하는 이메일 입니다." : ""}
          </span>
          <TextField
            error={isExistIdError}
            size="small"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            required
            onChange={(e) => handleChange(e)}
          />
          <TextField
            error={isPasswordError}
            autoComplete="off"
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            onChange={(e) => handleChange(e)}
          />
          <TextField
            error={isPasswordError}
            autoComplete="off"
            size="small"
            name="passwordCheck"
            label="Password check"
            variant="outlined"
            type="password"
            required
            onChange={(e) => handleChange(e)}
          />
          <TextField
            size="small"
            name="name"
            label="Name"
            variant="outlined"
            required
            onChange={(e) => handleChange(e)}
          />
          <Button className={styles.submit} variant="contained" type="submit">
            sign up
          </Button>
        </form>
      </motion.section>
    </article>
  );
}

export default SignUp;
