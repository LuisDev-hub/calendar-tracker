import { useState } from "react";
import { useCalenContext } from "../AppContext";
import "./SideMenu.css";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useCalenContext();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="side-menu-topbar">
        <button
          className="side-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`side-menu-overlay ${isOpen ? "visible" : ""}`}
        onClick={toggleMenu}
      />

      <nav className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <h3>Menu</h3>
        </div>

        <div className="side-menu-section">
          <span className="side-menu-label">Idioma</span>
          <div className="side-menu-lang">
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={lang === "es" ? "active" : ""}
              onClick={() => setLang("es")}
            >
              ES
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideMenu;
