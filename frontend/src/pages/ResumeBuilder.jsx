import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "../styles/resume.css";

const ResumeBuilder = () => {
  const componentRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    education: [{ degree: "", college: "", year: "" }],
    experience: [{ role: "", company: "", duration: "", description: "" }],
    projects: [{ title: "", link: "", description: "" }],
    skills: "",
  });

  const handleChange = (section, index, key, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][key] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleAdd = (section) => {
    const newItem =
      section === "education"
        ? { degree: "", college: "", year: "" }
        : section === "experience"
        ? { role: "", company: "", duration: "", description: "" }
        : { title: "", link: "", description: "" };

    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Resume",
  });

  return (
    <div style={{ height: "100vh", overflowY: "auto", padding: "1rem", boxSizing: "border-box" }}>
      <div className="resume-builder">
        {/* Form Section */}
        <div className="form-section">
          <h2>Resume Builder</h2>

          {/* Personal Info */}
          <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input type="text" placeholder="LinkedIn" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
          <input type="text" placeholder="GitHub" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} />

          {/* Education Section */}
          <h3>Education</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx}>
              <input placeholder="Degree" value={edu.degree} onChange={(e) => handleChange("education", idx, "degree", e.target.value)} />
              <input placeholder="College" value={edu.college} onChange={(e) => handleChange("education", idx, "college", e.target.value)} />
              <input placeholder="Year" value={edu.year} onChange={(e) => handleChange("education", idx, "year", e.target.value)} />
            </div>
          ))}
          <button onClick={() => handleAdd("education")}>Add Education</button>

          {/* Experience Section */}
          <h3>Experience</h3>
          {formData.experience.map((exp, idx) => (
            <div key={idx}>
              <input placeholder="Role" value={exp.role} onChange={(e) => handleChange("experience", idx, "role", e.target.value)} />
              <input placeholder="Company" value={exp.company} onChange={(e) => handleChange("experience", idx, "company", e.target.value)} />
              <input placeholder="Duration" value={exp.duration} onChange={(e) => handleChange("experience", idx, "duration", e.target.value)} />
              <textarea placeholder="Description" value={exp.description} onChange={(e) => handleChange("experience", idx, "description", e.target.value)} />
            </div>
          ))}
          <button onClick={() => handleAdd("experience")}>Add Experience</button>

          {/* Projects Section */}
          <h3>Projects</h3>
          {formData.projects.map((proj, idx) => (
            <div key={idx}>
              <input placeholder="Title" value={proj.title} onChange={(e) => handleChange("projects", idx, "title", e.target.value)} />
              <input placeholder="GitHub/Live Link" value={proj.link} onChange={(e) => handleChange("projects", idx, "link", e.target.value)} />
              <textarea placeholder="Description" value={proj.description} onChange={(e) => handleChange("projects", idx, "description", e.target.value)} />
            </div>
          ))}
          <button onClick={() => handleAdd("projects")}>Add Project</button>

          {/* Skills Section */}
          <h3>Skills</h3>
          <textarea placeholder="E.g. JavaScript, React, Node.js" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />

          {/* Download */}
          <button className="download-btn" onClick={handlePrint}>
            Download PDF
          </button>
        </div>

        {/* Resume Preview */}
        <div className="resume-preview" ref={componentRef}>
          <h2>{formData.name}</h2>
          <p>Email: {formData.email} | Phone: {formData.phone}</p>
          <p>LinkedIn: {formData.linkedin} | GitHub: {formData.github}</p>

          <h3>Education</h3>
          <ul>
            {formData.education.map((edu, i) => (
              <li key={i}>{edu.degree} at {edu.college} ({edu.year})</li>
            ))}
          </ul>

          <h3>Experience</h3>
          <ul>
            {formData.experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                <p>{exp.description}</p>
              </li>
            ))}
          </ul>

          <h3>Projects</h3>
          <ul>
            {formData.projects.map((proj, i) => (
              <li key={i}>
                <strong>{proj.title}</strong> — <a href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>
                <p>{proj.description}</p>
              </li>
            ))}
          </ul>

          <h3>Skills</h3>
          <p>{formData.skills}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
