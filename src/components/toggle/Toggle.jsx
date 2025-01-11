import React from "react";
import styles from "./toggle.module.css";
function Toggle() {
  return (
    <div className={styles.toggle}>
      <input type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
}

export default React.memo(Toggle);
