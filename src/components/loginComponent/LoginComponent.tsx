"use client";
import styles from "../loginComponent/LoginComponent.module.css";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getToken, getUser } from "@/store/slices/features/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";

export const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Promise.all([
        dispatch(getToken(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
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
        <>
          <div className={styles.loginBoxInput}>
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
          </div>
          <button
            type={"submit"}
            className={styles.loginButton}
            onClick={handleLogin}
          >
            Войти
          </button>
          <Link className={styles.loginLink} href="/signup">
            Регистрироваться
          </Link>
        </>
      </div>
    </div>
  );
};
