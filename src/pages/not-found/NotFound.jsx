 import image from "../../../public/404_page-not-found.png";
import styles from "./notFound.module.css"
function NotFound() {
  return <img src={image} alt="Not found   image  " loading="lazy" className={styles.image}/>;
}

export default NotFound;
