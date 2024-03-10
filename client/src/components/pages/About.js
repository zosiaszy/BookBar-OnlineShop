import { Container } from "react-bootstrap";
import styles from './About.module.scss';


const About = () => {
  return (
    <div>
     <div className={styles.about}>
      <Container>
      
        <h1 className="text-center">About BookBar</h1>
        <div className="mission">
          <h2 className="text-center mt-3">BookBar</h2>
          <p>
            Welcome to BookBar, your ultimate haven for all things literary! Nestled in the heart of the bustling city, BookBar is not just a bookstore but a sanctuary for book lovers, bibliophiles, and those seeking solace in the written word.
            As you step through our doors, you're greeted by the irresistible scent of freshly brewed coffee mingling with the comforting aroma of well-loved books. Our cozy ambiance invites you to lose yourself amidst towering shelves lined with an eclectic array of titles spanning every genre imaginable.
          </p>
        </div>
        <div className="about-us">
          <h2 className="text-center">Contact</h2>
          <img src="/images/bookshopcontact.png" alt="bookbar"  />
        </div>
       
      </Container>
    </div>
   
    </div>
  );
};

export default About;
