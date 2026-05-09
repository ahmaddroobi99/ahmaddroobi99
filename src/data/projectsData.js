import generalizationPdf from "../../files/Ahmad_project_on_Generalization.pdf?url";
import mathMlPdf from "../../files/Math_ML.pdf?url";
import timeBehaviorPdf from "../../files/time_behavior.pdf?url";

export const projects = [
  {
    title: "Research Software for Turbulent Flow Filtering",
    summary:
      "Implemented filtering and state-estimation workflows for high-dimensional flow models using noisy observation data.",
    technologies: ["Python", "MATLAB", "Numerical methods", "Data assimilation", "Evaluation pipelines"],
    problem: "Noisy and sparse observations make it difficult to estimate the internal state of complex dynamical systems.",
    impact:
      "Relevant to perception and autonomy software where models must infer system state from incomplete sensor measurements.",
    href: "https://hdl.handle.net/1880/122341"
  },
  {
    title: "LiDAR & Perception Data Pipeline",
    summary:
      "Defined a perception-data pipeline direction for LiDAR-style inputs, including cleaning, spatial interpretation, visualization, and ML-ready feature preparation.",
    technologies: ["Python", "Point cloud concepts", "Spatial data", "Visualization", "Machine learning preparation"],
    problem: "Perception systems need reliable preprocessing before raw spatial data can support detection, mapping, or model evaluation.",
    impact:
      "Connects my current software and ML background to LiDAR, robotics, and perception systems without overstating shipped production work.",
    href: null
  },
  {
    title: "Software Reporting System",
    summary:
      "Developed a reporting workflow that captures user-submitted data, structures it, and makes records easier to review and maintain.",
    technologies: ["Web application", "Forms", "Data organization", "Reporting workflows"],
    problem: "Manual reporting creates scattered records, weak traceability, and slow review cycles.",
    impact:
      "Demonstrates product-oriented engineering: data modeling, interface flow, validation needs, and operational usability.",
    href: "/reporting_system.html"
  },
  {
    title: "CookOverflow",
    summary:
      "Built a capstone application for organizing cooking and recipe data through a searchable user workflow.",
    technologies: ["Application design", "Databases", "User workflows", "Software capstone"],
    problem: "Recipe and cooking information is hard to reuse when it is not structured around search, categories, and user actions.",
    impact:
      "Shows database-backed application design, user workflow planning, and product-style software implementation.",
    href: "https://repository.najah.edu/items/3a8b9d6c-9c1e-4308-8f5a-e5f7fec1af25"
  },
  {
    title: "Simple Electric Circuit Builder",
    summary:
      "Developed an engineering tool for circuit construction workflows with software-guided interaction and automation concepts.",
    technologies: ["Engineering software", "Automation", "Hardware/software concepts", "Interface design"],
    problem: "Hardware prototyping can be error-prone when circuit construction steps are manual and poorly guided.",
    impact:
      "Connects software design with physical systems, automation, and the type of hardware-adjacent thinking used in robotics platforms.",
    href: "https://www.researchgate.net/publication"
  },
  {
    title: "Machine Learning Notes and Technical Reviews",
    summary:
      "Prepared technical notes and experiments on machine learning, generalization, mathematical foundations, and time-dependent behavior.",
    technologies: ["Technical documentation", "Machine learning", "Applied mathematics", "Research writing"],
    problem: "AI/ML work is difficult to evaluate without clear assumptions, documented experiments, and readable technical reasoning.",
    impact:
      "Demonstrates technical communication, mathematical maturity, and the ability to explain model behavior to engineering audiences.",
    href: mathMlPdf,
    secondaryHref: generalizationPdf,
    tertiaryHref: timeBehaviorPdf
  }
];
