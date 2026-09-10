import React, { useState, useEffect } from "react";

import styles from "./Projects.module.css";
import initialProjects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { supabase } from "../../supabaseClient";

export const Projects = () => {
  const [projectsList, setProjectsList] = useState(initialProjects);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map((p) => ({
            title: p.title,
            imageSrc: p.image_url || "projects/project.svg",
            description: p.description,
            skills: p.skills || [],
            demo: p.demo_url || "#",
            source: p.source_url || "https://github.com/pallavigogineni929"
          }));
          setProjectsList(mapped);
        }
      } catch (err) {
        console.warn("Using local projects fallback:", err);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projectsList.map((project, id) => {
          return <ProjectCard key={id} project={project} />;
        })}
      </div>
    </section>
  );
};