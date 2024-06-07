"use client";
import { useContext, useState } from "react";
import styles from "./LoginComponent.module.css";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignInMutation } from "@/services/auth";
import Image from "next/image";
import { UserContext } from "@/userContext";

export const LoginComponent = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отслеживания отправки данных
  const [, setAutocompleteOff] = useState(false);
  const [signIn] = useSignInMutation();

  const navigate = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setAutocompleteOff(true);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (event) => {
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
      signIn({ email, password })
        .unwrap()
        .then((response) => {
          setUser(response);
          navigate.push("/");
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form type={"submit"} className={styles.loginForm}>
          <div className={styles.loginBoxInput}>
            <input
              className={styles.loginInput}
              type="text"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={handleInputChange}
              autoComplete="off"
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={handleInputChange}
              autoComplete="off"
            ></input>
          </div>
          {error && <div className={styles.registrError}>{error}</div>}
          <button
            className={styles.loginButton}
            type={"submit"}
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Вход..." : "Войти"}
          </button>
          <Link className={styles.loginLink} href={"/registr"}>
            Зарегистрироваться
          </Link>
        </form>
      </div>
    </div>
  );
};
