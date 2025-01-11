import React from "react";
import styles from "./title.module.css";

const Title = ({ children }) => (
  <h1 className={styles.titleHeading}>{children}</h1>
);

export default React.memo(Title);
