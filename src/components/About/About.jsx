import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.svg")}
          alt="Developer workstation"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.svg")} alt="Software development icon" />
            <div className={styles.aboutItemText}>
              <h3>Software & Web Development</h3>
              <p>
                Proficient in Java, C, Python, and web technologies (HTML, CSS).
                Skilled in developing clean, structured applications and working with database queries.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.svg")} alt="Database and cloud icon" />
            <div className={styles.aboutItemText}>
              <h3>Databases & Cloud Architecture</h3>
              <p>
                Experienced in relational databases, writing complex SQL queries, and integrating
                cloud services like Supabase for authentication, real-time data, and PostgreSQL storage.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.svg")} alt="Strengths icon" />
            <div className={styles.aboutItemText}>
              <h3>Problem Solving & SDLC</h3>
              <p>
                Strong analytical thinking, quick learner, adaptable team player with thorough understanding
                of the Software Development Lifecycle (SDLC) and modern version control (Git/GitHub).
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};