import { Link } from 'react-router-dom';
export default function About() {
  return (
    <div className="shell section">
      <div className="menu-intro">
        <p className="eyebrow">Sip. Savor. Smile.</p>
        <h1>
          Our <em>story.</em>
        </h1>
        <p>A welcoming little corner of Kotugoda.</p>
      </div>
      <div className="story-grid">
        <img
          src="/brand/cafe.webp"
          alt="The dining space at Deelectaa Café"
          width="900"
          height="650"
        />
        <div>
          <h2>
            A place for your
            <br />
            <em>everyday moments.</em>
          </h2>
          <p>
            At Déelectaa Café, coffee is a reason to pause, connect, and enjoy
            something lovely. Visit us for a freshly brewed cup, a comforting
            meal, or a sweet finish to your day.
          </p>
          <p>
            Our menu brings together classic coffees, bubble teas and coolers,
            gourmet burgers, sandwiches, freshly built submarines, and desserts.
          </p>
          <p>Make yourself at home at 445/1/1 Seeduwa Road, Kotugoda.</p>
        </div>
      </div>
      <section className="section">
        <h2>
          Take a look <em>around.</em>
        </h2>
        <p className="lead">A glimpse of life at Déelectaa.</p>
        <Link className="button mt-8" to="/gallery">Explore our gallery ↗</Link>
      </section>
    </div>
  );
}
