import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import groups from "../menu-data.json";
export default function Menu() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("category") || "All";
  const [q, setQ] = useState("");
  const shown = groups
    .filter((g) => cat === "All" || g.name === cat)
    .map((g) => ({
      ...g,
      items: g.items.filter((i) =>
        (i.name + " " + i.description)
          .toLowerCase()
          .includes(q.trim().toLowerCase()),
      ),
    }))
    .filter((g) => g.items.length);
  return (
    <div className="menu-page shell">
      <div className="menu-intro">
        <p className="eyebrow">Freshly made. Happily shared.</p>
        <h1>
          Find your <em>favourite.</em>
        </h1>
        <p>Coffee, coolers, comforting bites, and something sweet.</p>
        <a className="text-link" href="/brand/menu.pdf" download>
          Download our printed menu (PDF · 45 MB) ↓
        </a>
      </div>
      <div className="menu-controls">
        <label htmlFor="menu-search">Search the menu</label>
        <input
          id="menu-search"
          type="search"
          placeholder="Try latte, burger, or chocolate…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="category-tabs" aria-label="Menu categories">
          {["All", ...groups.map((g) => g.name)].map((n) => (
            <button
              key={n}
              aria-pressed={cat === n}
              className={cat === n ? "selected" : ""}
              onClick={() => setParams(n === "All" ? {} : { category: n })}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <p className="menu-note">
        All prices are in Sri Lankan rupees (Rs.). A 10% service charge applies
        to all items. Please let our team know about any allergies or dietary
        requirements.
      </p>
      <div aria-live="polite">
        {shown.length ? (
          shown.map((g) => (
            <section className="menu-group" key={g.name}>
              <h2>{g.name}</h2>
              {g.name === "Speciality Coffee" && (
                <p className="menu-note">Served hot or cold.</p>
              )}
              {g.name === "Bubble Tea" && (
                <p className="menu-note">Chewy tapioca pearls in every sip.</p>
              )}
              <div className="menu-grid">
                {g.items.map((i) => (
                  <article className="menu-item" key={i.name}>
                    <div className="item-top">
                      <h3>
                        {i.name}
                        {i.signature && (
                          <span
                            className="signature"
                            aria-label="Signature favourite"
                          >
                            {" "}
                            ✦
                          </span>
                        )}
                      </h3>
                      <strong>{i.price}</strong>
                    </div>
                    {i.description && <p>{i.description}</p>}
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="empty-state">
            <h2>No favourites found just yet.</h2>
            <p>Try another search or select All categories.</p>
            <button
              className="button"
              onClick={() => {
                setQ("");
                setParams({});
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      <aside className="menu-help">
        <h2>Make a moment of it.</h2>
        <p>Enjoy your favourites at our Kotugoda café.</p>
        <Link className="button" to="/reservations">
          Book a table ↗
        </Link>
      </aside>
    </div>
  );
}
