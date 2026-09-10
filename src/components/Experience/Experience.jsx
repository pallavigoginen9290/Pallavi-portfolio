import React, { useState, useEffect } from "react";

import styles from "./Experience.module.css";
import initialSkills from "../../data/skills.json";
import initialHistory from "../../data/history.json";
import { getImageUrl } from "../../utils";
import { supabase } from "../../supabaseClient";

export const Experience = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [history, setHistory] = useState(initialHistory);

  useEffect(() => {
    async function loadSupabaseData() {
      try {
        const { data: skillsData, error: skillsError } = await supabase
          .from("skills")
          .select("*");

        if (!skillsError && skillsData && skillsData.length > 0) {
          const iconMap = {
            "C": "skills/c.svg",
            "Java": "skills/java.svg",
            "Python (Basic)": "skills/python.svg",
            "HTML": "skills/html.svg",
            "CSS": "skills/css.svg",
            "SQL": "skills/sql.svg",
            "Database Queries": "skills/sql.svg",
            "Supabase (PostgreSQL)": "skills/supabase.svg",
            "Visual Studio": "skills/vscode.svg",
            "Notepad++": "skills/vscode.svg",
            "Git & GitHub": "skills/git.svg",
            "Windows OS": "skills/vscode.svg"
          };
          const mappedSkills = skillsData
            .filter((s) => !s.title.toLowerCase().includes("react") && !s.title.toLowerCase().includes("javascript"))
            .map((s) => ({
              title: s.title,
              imageSrc: iconMap[s.title] || "skills/vscode.svg"
            }));
          setSkills(mappedSkills);
        }

        const { data: eduData, error: eduError } = await supabase
          .from("education")
          .select("*")
          .order("display_order", { ascending: true });

        const { data: certData, error: certError } = await supabase
          .from("certifications")
          .select("*");

        if (!eduError && eduData && eduData.length > 0) {
          const formattedEdu = eduData.map((edu) => ({
            role: edu.degree,
            organisation: `${edu.institution} - ${edu.board_or_university || ""}`,
            startDate: edu.year || "",
            endDate: edu.score || "",
            experiences: [
              `Academic score: ${edu.score}`,
              `Affiliated with ${edu.board_or_university || "State Board"}`
            ],
            imageSrc:
              edu.display_order === 1
                ? "history/college.svg"
                : edu.display_order === 2
                ? "history/polytechnic.svg"
                : "history/school.svg"
          }));

          const formattedCert = (certData && !certError ? certData : []).map(
            (cert) => ({
              role: `${cert.title} Certification`,
              organisation: cert.issuer,
              startDate: "Verified",
              endDate: "",
              experiences: [
                `Certified in technical skills and competencies by ${cert.issuer}`
              ],
              imageSrc: cert.issuer.toLowerCase().includes("wipro")
                ? "history/wipro.svg"
                : "history/nptel.svg"
            })
          );

          setHistory([...formattedEdu, ...formattedCert]);
        }
      } catch (err) {
        console.warn("Loaded local resume data fallback:", err);
      }
    }

    loadSupabaseData();
  }, []);

  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Skills & Education</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        <ul className={styles.history}>
          {history.map((historyItem, id) => {
            return (
              <li key={id} className={styles.historyItem}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>{historyItem.startDate} {historyItem.endDate ? `| ${historyItem.endDate}` : ""}</p>
                  <ul>
                    {historyItem.experiences.map((experience, idx) => {
                      return <li key={idx}>{experience}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};