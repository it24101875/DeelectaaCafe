import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Déelectaa Café home">
          <img
            src="/brand/logo-1.webp"
            alt="Déelectaa Café — Sip. Savor. Smile."
          />
        </Link>
        <button
          className="nav-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
        <div
          id="nav-links"
          className={"nav-links " + (open ? "is-open" : "")}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {[
            ["Home", "/"],
            ["Menu", "/menu"],
            ["Our story", "/about"],
            ["Gallery", "/gallery"],
            ["Visit us", "/contact"],
          ].map(([n, p]) => (
            <NavLink
              key={p}
              to={p}
              end={p === "/"}
              onClick={() => setOpen(false)}
            >
              {n}
            </NavLink>
          ))}
          <Link
            className="button"
            to="/reservations"
            onClick={() => setOpen(false)}
          >
            Book a table ↗
          </Link>
        </div>
      </nav>
    </header>
  );
}
