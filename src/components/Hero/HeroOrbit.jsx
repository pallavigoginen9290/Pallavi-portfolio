import React, { useState } from "react";
import styles from "./HeroOrbit.module.css";
import { getImageUrl } from "../../utils";

const INNER_SKILLS = [
  {
    name: "React",
    icon: "skills/react.svg",
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.45)",
    category: "Frontend",
  },
  {
    name: "Supabase",
    icon: "skills/supabase.svg",
    color: "#3ecf8e",
    glow: "rgba(62, 207, 142, 0.45)",
    category: "Cloud Backend",
  },
  {
    name: "Python",
    icon: "skills/python.svg",
    color: "#ffd43b",
    glow: "rgba(255, 212, 59, 0.45)",
    category: "Data & Scripting",
  },
  {
    name: "SQL",
    icon: "skills/sql.svg",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.45)",
    category: "Relational DB",
  },
];

const OUTER_SKILLS = [
  {
    name: "Java",
    icon: "skills/java.svg",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.45)",
    category: "OOP / Backend",
  },
  {
    name: "Git",
    icon: "skills/git.svg",
    color: "#f05032",
    glow: "rgba(240, 80, 50, 0.45)",
    category: "Version Control",
  },
  {
    name: "C / C++",
    icon: "skills/c.svg",
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.45)",
    category: "Systems / DSA",
  },
  {
    name: "HTML & CSS",
    icon: "skills/html.svg",
    color: "#e34f26",
    glow: "rgba(227, 79, 38, 0.45)",
    category: "Web UI",
  },
];

export const HeroOrbit = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div className={styles.orbitContainer} aria-label="Interactive skill orbit and developer globe">
      {/* Ambient background glow behind the entire orbit system */}
      <div className={styles.ambientGlow} />

      {/* Decorative SVG background orbital tracks & celestial radar */}
      <svg className={styles.trackSvg} viewBox="0 0 540 540" aria-hidden="true">
        <defs>
          <radialGradient id="spaceAtmosphere" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#576cbc" stop-opacity="0.15" />
            <stop offset="60%" stop-color="#19376d" stop-opacity="0.08" />
            <stop offset="100%" stop-color="#030b1e" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="orbitTrackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6fffe9" stop-opacity="0.6" />
            <stop offset="50%" stop-color="#576cbc" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#3ecf8e" stop-opacity="0.5" />
          </linearGradient>
        </defs>

        <circle cx="270" cy="270" r="260" fill="url(#spaceAtmosphere)" />

        {/* Outer Orbit Track (Radius = 230) */}
        <circle
          cx="270"
          cy="270"
          r="230"
          fill="none"
          stroke="url(#orbitTrackGrad)"
          stroke-width="1.5"
          stroke-dasharray="8 14"
          className={styles.staticTrackOuter}
        />

        {/* Inner Orbit Track (Radius = 165) */}
        <circle
          cx="270"
          cy="270"
          r="165"
          fill="none"
          stroke="#6fffe9"
          stroke-width="1.4"
          stroke-dasharray="6 10"
          opacity="0.5"
          className={styles.staticTrackInner}
        />

        {/* Fine guide circles */}
        <circle cx="270" cy="270" r="198" fill="none" stroke="#576cbc" stroke-width="0.8" stroke-dasharray="2 12" opacity="0.4" />
      </svg>

      {/* OUTER ORBIT RING: Rotates Counter-Clockwise (36s) */}
      <div className={styles.orbitRingOuter}>
        {OUTER_SKILLS.map((skill, index) => {
          const angle = (360 / OUTER_SKILLS.length) * index;
          return (
            <div
              key={skill.name}
              className={styles.outerSlot}
              style={{ "--angle": `${angle}deg` }}
            >
              <div
                className={styles.counterRotateOuter}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div
                  className={styles.skillBadge}
                  style={{
                    "--brand-color": skill.color,
                    "--brand-glow": skill.glow,
                  }}
                >
                  <img
                    src={getImageUrl(skill.icon)}
                    alt={`${skill.name} logo`}
                    className={styles.skillIcon}
                  />
                  <span className={styles.skillLabel}>{skill.name}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Orbit Node Satellites (Tiny twinkling celestial markers) */}
        <div className={styles.satelliteOuter1} />
        <div className={styles.satelliteOuter2} />
      </div>

      {/* INNER ORBIT RING: Rotates Clockwise (24s) */}
      <div className={styles.orbitRingInner}>
        {INNER_SKILLS.map((skill, index) => {
          const angle = (360 / INNER_SKILLS.length) * index;
          return (
            <div
              key={skill.name}
              className={styles.innerSlot}
              style={{ "--angle": `${angle}deg` }}
            >
              <div
                className={styles.counterRotateInner}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div
                  className={styles.skillBadge}
                  style={{
                    "--brand-color": skill.color,
                    "--brand-glow": skill.glow,
                  }}
                >
                  <img
                    src={getImageUrl(skill.icon)}
                    alt={`${skill.name} logo`}
                    className={styles.skillIcon}
                  />
                  <span className={styles.skillLabel}>{skill.name}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Inner Orbit Sparkle Nodes */}
        <div className={styles.satelliteInner1} />
        <div className={styles.satelliteInner2} />
      </div>

      {/* CENTRAL CYBER TECH GLOBE & AVATAR HUB */}
      <div className={styles.centralHub}>
        <div className={styles.globeRingGlow} />
        <div className={styles.globeSphere}>
          <img
            src={getImageUrl("hero/globeAvatar.svg")}
            alt="Gogineni Pallavi Cyber Globe Avatar"
            className={styles.globeImg}
          />
        </div>

        {/* Status Pill beneath Globe */}
        <div className={styles.hubStatusPill}>
          <span className={styles.hubPulseDot} />
          <span>{activeSkill ? `${activeSkill.name} • ${activeSkill.category}` : "Software Engineer"}</span>
        </div>
      </div>
    </div>
  );
};
