"use client";
import styles from "../loginComponent/LoginComponent.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSignUpMutation } from "../../services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signUp] = useSignUpMutation();

  const navigate = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "repeat-password") {
      setRepeatPassword(value);
    } else if (name === "username") {
      setUserName(value);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (!email) {
        setError("Не заполнено 'Почта'");
        return;
      }
      if (!password) {
        setError("Не заполнено 'Пароль'");
        return;
      }
      if (!repeatPassword) {
        setError("Подтвердите пароль");
        return;
      }
      if (!username) {
        setError("Не заполнено 'Имя пользователя'");
        return;
      }
      if (password !== repeatPassword) {
        setError("Пароли не совпадают");
      } else {
        signUp({ email, password, username })
          .unwrap()
          .then(() => {
            alert(`Выполняется регистрация: ${email} ${username}`);
            navigate.push("/login");
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setError(null);
  }, [email, password, repeatPassword, username]);

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.loginBlock}>
        <Link href={"/"} className={classNames(styles.navLogo, styles.logo)}>
          <Image
            className={styles.logoImage}
            src="/img/logo_modal.png"
            alt="logo"
            width={140}
            height={21}
          />
        </Link>
        <>
          <div className={styles.loginBoxInput}>
            <input
              className={styles.loginInput}
              type="text"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={handleInputChange}
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={handleInputChange}
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="repeat-password"
              placeholder="Подтвердите пароль"
              value={repeatPassword}
              onChange={handleInputChange}
            ></input>
            <input
              className={styles.loginInput}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={username}
              onChange={handleInputChange}
            ></input>
          </div>
          {error && <div className={styles.registrError}>{error}</div>}
          <button
            type={"submit"}
            className={styles.loginButton}
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </button>
          <Link className={styles.loginLink} href={"/login"}>
            Войти
          </Link>
        </>
      </div>
    </div>
  );
};
