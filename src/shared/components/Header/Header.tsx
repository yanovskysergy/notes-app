import { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element;
}

export const Header: FC<HeaderProps> = ({ headerLeft, headerRight }) => {
  return (
    <header className={styles.header}>
      <div>{headerLeft}</div>
      <div>{headerRight}</div>
    </header>
  );
};
