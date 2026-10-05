import React, { useState } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        <span className={styles.brandCode}>&lt;</span>
        <span className={styles.brandName}>Pallavi</span>
        <span className={styles.brandDot}>.</span>
        <span className={styles.brandExt}>dev</span>
        <span className={styles.brandCode}>&nbsp;/&gt;</span>
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.svg")
              : getImageUrl("nav/menuIcon.svg")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Skills & Education</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact" className={styles.contactLink}>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};