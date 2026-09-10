import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";
import { supabase } from "../../supabaseClient";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_8gs1qlu";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_5h1n5mq";
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "BBLDSsm3pPdc8xh4q";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // 1. Send direct email to Pallavi's inbox via EmailJS
      const templateParams = {
        name: formData.name.trim(),
        from_name: formData.name.trim(),
        email: formData.email.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        message: formData.message.trim(),
        to_name: "Gogineni Pallavi",
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Also save to Supabase as database backup
      try {
        await supabase.from("messages").insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim()
          }
        ]);
      } catch (dbErr) {
        console.warn("Supabase backup notice:", dbErr);
      }

      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent to my inbox. I'll get back to you soon."
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS sending error:", err);
      setStatus({
        type: "error",
        message: "Failed to send message via form. Please reach out directly at pallavigogineni9290@gmail.com."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Let's connect! Open to Software Developer opportunities.</p>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <img src={getImageUrl("contact/emailIcon.svg")} alt="Email icon" />
            <a href="mailto:pallavigogineni9290@gmail.com">pallavigogineni9290@gmail.com</a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/phoneIcon.svg")} alt="Phone icon" />
            <a href="tel:+919390906950">+91 9390906950</a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/linkedinIcon.svg")} alt="LinkedIn icon" />
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/gogineni-pallavi
            </a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/githubIcon.svg")} alt="GitHub icon" />
            <a href="https://github.com/pallavigogineni929" target="_blank" rel="noopener noreferrer">
              github.com/pallavigogineni929
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.formContainer}>
        <h3>Send Me a Message</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Hello Pallavi, I'd like to talk about..."
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {status.type === "success" && (
            <div className={styles.statusSuccess}>✓ {status.message}</div>
          )}
          {status.type === "error" && (
            <div className={styles.statusError}>✕ {status.message}</div>
          )}
        </form>
      </div>
    </footer>
  );
};