import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import styles from '../views/Carousel.module.scss'


 

const ShopCarousel = () => {
  return (
 
  <Carousel className={styles.carousel}>
      
    <Carousel.Item >
          <img
            className={`d-block w-100 ${styles.image}`}
            src="./images/sales.jpg"
            alt="sale"
          />
        </Carousel.Item>
    <Carousel.Item >
          <img
            className={`d-block w-100 ${styles.image}`}
            src="./images/favs.jpg"
            alt="favorites"
          />
        </Carousel.Item>
    </Carousel>

  )}

export default ShopCarousel;