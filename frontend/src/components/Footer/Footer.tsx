import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link to="/">
            <img
              className="footer-logo"
              src="/brand/logo-1.webp"
              alt="Déelectaa Café"
              width="150"
              height="150"
              loading="lazy"
            />
          </Link>
          <p>
            Good coffee. Freshly made favourites.
            <br />A little time for yourself.
          </p>
          <div className="socials">
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/profile.php?id=61561280411467"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/deelectaacafe/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              aria-label="TikTok"
              href="https://www.tiktok.com/@deelectaacafe?lang=en-GB"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
        <div>
          <h3>Make yourself at home</h3>
          <Link to="/menu">Explore the menu</Link>
          <Link to="/about">Our story</Link>
          <Link to="/gallery">Our moments</Link>
          <Link to="/reservations">Book a table</Link>
        </div>
        <div>
          <h3>Come by</h3>
          <p>
            445/1/1 Seeduwa Road,
            <br />
            Kotugoda, Sri Lanka
          </p>
          <p>
            Every day · 7:00 am–9:00 pm
            <br />
            Open on holidays
          </p>
          <Link to="/contact">Find us ↗</Link>
        </div>
        <div>
          <h3>Say hello</h3>
          <a href="tel:+94763961078">+94 76 396 1078</a>
          <a href="mailto:deelectaacafe@gmail.com">deelectaacafe@gmail.com</a>
          <p>
            For private events and larger groups,
            <br />
            get in touch with our team.
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Déelectaa Café</span>
        <span>Sip. Savor. Smile.</span>
        <Link to="/contact">Contact & enquiries</Link>
      </div>
    </footer>
  );
}
