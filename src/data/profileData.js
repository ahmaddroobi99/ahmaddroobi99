import profileImg from "../../img/prof.jpg";
import signatureImg from "../../img/AhmadDroobiSignature.png";
import heroImg from "../../img/cal2.jpg";
import cvPdf from "../../files/Ahmad_Droobi_CV_2026.pdf?url";
import publicPdf from "../../files/Ahmad Droobi public 2024.pdf?url";
import generalizationPdf from "../../files/Ahmad_project_on_Generalization.pdf?url";

export const profile = {
  name: "Ahmad Droobi",
  title: "Software Engineer | AI/ML Developer | LiDAR & Perception Systems",
  tagline: "Building reliable software for data-intensive AI, perception, automation, and intelligent systems.",
  email: "ahmad.droobi@ucalgary.ca",
  githubUsername: "ahmaddroobi99",
  github: "https://github.com/ahmaddroobi99",
  linkedin: "https://www.linkedin.com/in/droobi/",
  scholar: "https://scholar.google.com/citations?hl=en&user=H-3pF00AAAAJ&view_op=list_works&sortby=pubdate",
  thesis: "https://hdl.handle.net/1880/122341",
  profileImg,
  signatureImg,
  heroImg,
  cvPdf,
  publicPdf,
  generalizationPdf
};

export const aboutCopy = {
  intro:
    "I build software at the intersection of backend systems, AI/ML workflows, and perception-oriented data processing. My work focuses on turning noisy, high-dimensional data into tested, maintainable software that supports analysis, automation, and decision-making.",
  body:
    "My background combines computer engineering, Python backend development, React interfaces, data pipelines, numerical computing, and machine learning experimentation. I am especially interested in roles where software quality, data correctness, and scalable engineering matter: AI platforms, robotics, LiDAR/perception, infrastructure for ML, and applied product engineering.",
  highlights: [
    "Implemented Python and MATLAB workflows for state estimation, numerical experiments, and model evaluation.",
    "Built backend and full-stack features with Python, Django, React, APIs, and analytics data pipelines.",
    "Developed ML and computer vision experiments with preprocessing, evaluation, and software integration in mind.",
    "Positioning my software and AI/ML background toward LiDAR, spatial data, robotics, and perception systems."
  ]
};

export const publications = [
  {
    title: "Data-Driven Filtering Techniques for Turbulent Flow Models",
    meta: "A. Droobi - 2025",
    summary:
      "Built computational filtering workflows for noisy, high-dimensional dynamical systems, with emphasis on state estimation, reproducible experiments, and evaluation discipline.",
    href: "https://ucalgary.scholaris.ca",
    doi: null
  },
  {
    title: "Simple Electric Circuit Builder (SECB)",
    meta: "A. Droobi - 2023",
    summary:
      "Developed an engineering application for circuit-building workflows, connecting software interfaces with automation and hardware-oriented problem solving.",
    href: "https://www.researchgate.net/publication",
    doi: null
  },
  {
    title: "CookOverflow",
    meta: "A. Droobi, MND Shaqour, Ataa - 2022",
    summary:
      "Built a structured application as a capstone project, focusing on data organization, user workflow design, and maintainable software architecture.",
    href: "https://repository.najah.edu/items/3a8b9d6c-9c1e-4308-8f5a-e5f7fec1af25",
    doi: null
  },
  {
    title: "Deep Learning Random Process Predictivity Analysis",
    meta: "University of Calgary",
    summary:
      "Implemented deep learning experimentation workflows for predictivity analysis, including preprocessing, evaluation, and repeatable experiment structure.",
    href: publicPdf,
    doi: null
  }
];

export const awards = [
  ["Graduate Research Assistantship", "Schulich School of Engineering, University of Calgary", "September 2023"],
  ["International Graduate Tuition Award", "Schulich School of Engineering, University of Calgary", "September 2023 and September 2024"],
  ["AI/ML Fellow", "Fellowship.ai robotics simulator imitation learning project", "July 2023"],
  ["Machine Learning Summer School Award", "Scientists for Palestine Conference Award", "July 2022"],
  ["The Hebba and Ishaq Sadaqah Foundation", "Scholarship award", "December 2021 - January 2023"],
  ["Computer Engineering 50% Tuition Fees", "Honor Students, An-Najah National University", "January 2019 - January 2023"],
  ["Community Reputation Prize", "$10,000 award for ranking top of the country", "July 2017"],
  ["Palestinian President Scholarship", "Palestine Ministry of Education and Higher Education", "September 2017 - January 2023"]
];
