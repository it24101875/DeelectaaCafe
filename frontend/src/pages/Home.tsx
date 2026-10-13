import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <section className="home-hero shell">
        <div>
          <p className="eyebrow">Your neighbourhood café · Kotugoda</p>
          <h1>
            A little pause.
            <br />A lovely <em>sip.</em>
          </h1>
          <p className="lead">
            Freshly brewed coffee, comforting bites, and sweet little moments.
            Make yourself at home at Déelectaa.
          </p>
          <div className="actions">
            <Link to="/menu" className="button">
              Explore our menu ↗
            </Link>
            <Link to="/reservations" className="button secondary">
              Book a table
            </Link>
          </div>
          <p className="hero-detail">✦ Open every day · 7 am–9 pm</p>
        </div>
        <div className="hero-photo">
          <img
            src="/brand/cover.webp"
            alt="Coffee and the new Déelectaa Café menu"
            width="800"
            height="1000"
            fetchPriority="high"
          />
          <div className="photo-note">
            <span>Sip. Savor. Smile.</span>
            <small>Your daily dose of something lovely.</small>
          </div>
        </div>
      </section>
      <div className="welcome-strip">
        Fresh coffee　✦　 Comforting bites　✦　 Sweet moments
      </div>
      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your favourite</p>
            <h2>
              Something for every <em>mood.</em>
            </h2>
          </div>
          <Link to="/menu" className="text-link">
            See the full menu ↗
          </Link>
        </div>
        <div className="favourite-grid">
          {[
            [
              "coffee",
              "Coffee & coolers",
              "From your morning espresso to a refreshing bubble tea.",
              "From Rs. 400",
              "Coffee",
            ],
            [
              "burger",
              "Fresh from the kitchen",
              "Signature sandwiches, gourmet burgers, and loaded submarines.",
              "Kitchen from Rs. 980",
              "All",
            ],
            [
              "dessert",
              "A sweet ending",
              "Lava cake, cheesecake, brownies, and tiramisu.",
              "From Rs. 400",
              "Desserts & Sweets",
            ],
          ].map(([im, title, desc, price, cat]) => (
            <Link
              to={"/menu?category=" + encodeURIComponent(cat)}
              className="favourite-card"
              key={im}
            >
              <img
                src={"/brand/" + im + ".webp"}
                alt={title}
                width="640"
                height="480"
                loading="lazy"
              />
              <div>
                <span className="eyebrow">{price}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="text-link">Explore ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="story-section">
        <div className="shell story-grid">
          <img
            src="/brand/cafe.webp"
            alt="Deelectaa Café in Kotugoda"
            width="900"
            height="650"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">A place to slow down</p>
            <h2>
              Good company.
              <br />
              <em>Great coffee.</em>
            </h2>
            <p>
              Catch up with friends, settle in for a coffee, or share a meal
              with someone you love. Our Kotugoda café is here for the everyday
              moments that deserve a little more care.
            </p>
            <Link to="/about" className="text-link">
              Get to know us ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="shell visit-section">
        <p className="eyebrow">We’ll save you a seat</p>
        <h2>
          See you at <em>Déelectaa.</em>
        </h2>
        <p>445/1/1 Seeduwa Road, Kotugoda · Open every day</p>
        <div className="actions">
          <Link to="/reservations" className="button">
            Book a table ↗
          </Link>
          <Link to="/contact" className="button secondary">
            Plan your visit
          </Link>
        </div>
      </section>
    </>
  );
}
