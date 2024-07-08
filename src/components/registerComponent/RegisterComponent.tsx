"use client";
import styles from "../loginComponent/LoginComponent.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/store";

export const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    username: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { email, password, repeatPassword, username } = formData;

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
        return;
      }
      alert("Регистрация...");
      router.push("/signin");
    } catch (error) {
      setError((error as { message: string }).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setError(null);
  }, [formData]);

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
          <form onSubmit={handleRegister} className={styles.loginBoxInput}>
            <input
              className={styles.loginInput}
              type="text"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleInputChange}
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="repeatPassword"
              placeholder="Подтвердите пароль"
              value={formData.repeatPassword}
              onChange={handleInputChange}
            ></input>
            <input
              className={styles.loginInput}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleInputChange}
            ></input>
            {error && <div className={styles.registrError}>{error}</div>}
            <button
              type={"submit"}
              className={styles.loginButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </button>
            <Link className={styles.loginLink} href={"/signin"}>
              Войти
            </Link>
          </form>
        </>
      </div>
    </div>
  );
};
