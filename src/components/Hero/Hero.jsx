import React, { useRef } from "react";

import styles from "./Hero.module.css";
import { HeroOrbit } from "./HeroOrbit";

export const Hero = () => {
  const scrollBoxRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!scrollBoxRef.current) return;
    const { top, height } = scrollBoxRef.current.getBoundingClientRect();
    const mouseY = e.clientY - top;
    const percentage = Math.max(0, Math.min(1, mouseY / height));
    const maxScroll = scrollBoxRef.current.scrollHeight - scrollBoxRef.current.clientHeight;
    scrollBoxRef.current.scrollTop = percentage * maxScroll;
  };

  const handleMouseLeave = () => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span>Seeking Entry-Level Software Developer Roles</span>
        </div>

        <h1 className={styles.title}>
          Hi, I'm <span className={styles.nameHighlight}>Gogineni Pallavi</span>
        </h1>

        <div
          className={styles.scrollBox}
          ref={scrollBoxRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          title="Move cursor over this box to scroll text"
        >
          <div className={styles.scrollIndicator}>
            <span className={styles.scrollTag}>Interactive Summary</span>
            <span className={styles.scrollHintText}>Move cursor to scroll ↕</span>
          </div>
          <div className={styles.scrollInner}>
            <p className={styles.description}>
              Motivated Computer Science graduate with a strong academic record and foundational
              knowledge in <strong>Java, C, Python, SQL</strong>, and <strong>web technologies</strong>.
              Experienced in developing web applications, working with relational database queries,
              and integrating cloud services with <strong>Supabase</strong>.
            </p>
            <p className={styles.descriptionExtra}>
              Demonstrates strong problem-solving ability, adaptability, and teamwork with thorough understanding
              of the Software Development Lifecycle (SDLC). Seeking an entry-level Software Developer role to apply
              technical knowledge and contribute to innovative software solutions.
            </p>
          </div>
        </div>

        <div className={styles.btnGroup}>
          <a href="#contact" className={styles.contactBtn}>
            Get in Touch
          </a>
          <a href="#projects" className={styles.secondaryBtn}>
            View Projects
          </a>
        </div>
      </div>

      <div className={styles.heroImgWrapper}>
        <HeroOrbit />
      </div>

      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};