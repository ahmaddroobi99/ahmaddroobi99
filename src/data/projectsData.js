import generalizationPdf from "../../files/Ahmad_project_on_Generalization.pdf?url";
import mathMlPdf from "../../files/Math_ML.pdf?url";
import timeBehaviorPdf from "../../files/time_behavior.pdf?url";

export const projects = [
  {
    title: "Research Software for Turbulent Flow Filtering",
    category: "Research",
    summary:
      "Implemented filtering and state-estimation workflows for high-dimensional flow models using noisy observation data to support robust model evaluation and inference.",
    technologies: ["Python", "MATLAB", "Numerical methods", "Data assimilation", "Evaluation pipelines"],
    problem: "Noisy and sparse observations make it difficult to estimate the internal state of complex dynamical systems.",
    approach:
      "Built reproducible computational experiments around filtering algorithms, observation models, and state reconstruction metrics.",
    results: ["Supported graduate research on data-driven filtering", "Connected numerical estimation work to perception-style sensor inference"],
    impact:
      "This work maps directly to perception and autonomy systems where decision-making depends on reliable state estimates from imperfect sensors.",
    href: "https://hdl.handle.net/1880/122341"
  },
  {
    title: "LiDAR & Perception Data Pipeline",
    category: "LiDAR Perception",
    summary:
      "Designed a perception data workflow for LiDAR-style inputs, including point cloud cleaning, spatial interpretation, visualization, and ML-ready feature extraction.",
    technologies: ["Python", "Point cloud concepts", "Spatial data", "Visualization", "Machine learning preparation"],

    impact:
      "The pipeline supports safer perception workflows by turning noisy spatial input into actionable representations for robotics and ML systems.",
    href: null
  },
  {
    title: "Software Reporting System",
    category: "Tools",
    summary:
      "Built a reporting workflow that captures submitted data, structures it consistently, and makes records easier to review and maintain.",
    technologies: ["Web application", "Forms", "Data organization", "Reporting workflows"],
    problem: "Manual reporting creates scattered records, weak traceability, and slow review cycles.",
    approach:
      "Designed a form-driven workflow with clearer record structure, review paths, and maintainable presentation pages.",
    results: ["Reduced scattered manual reporting into a single flow", "Demonstrates operational software design and validation thinking"],
    impact:
      "Demonstrates product-oriented engineering with structured data models, validation, and usability for operational review.",
    href: "/reporting_system.html"
  },
  {
    title: "CookOverflow",
    category: "Tools",
    summary:
      "Built a capstone application for organizing cooking and recipe data through a searchable, structured user workflow.",
    technologies: ["Application design", "Databases", "User workflows", "Software capstone"],

    impact:
      "Shows database-backed application design, workflow planning, and product-style software implementation.",
    href: "https://repository.najah.edu/items/3a8b9d6c-9c1e-4308-8f5a-e5f7fec1af25"
  },
  {
    title: "Simple Electric Circuit Builder",
    category: "Sensor Fusion",
    summary:
      "Developed an engineering tool for circuit construction workflows, combining guided interaction with automation concepts.",
    technologies: ["Engineering software", "Automation", "Hardware/software concepts", "Interface design"],
    problem: "Hardware prototyping can be error-prone when circuit construction steps are manual and poorly guided.",
    approach:
      "Explored how software-guided interaction can make hardware-adjacent engineering tasks more repeatable and inspectable.",
    results: ["Published engineering application work", "Bridges software interfaces with physical-system workflows"],
    impact:
      "Connects software design with physical systems, automation, and the hardware-adjacent thinking used in robotics platforms.",
    href: "https://www.researchgate.net/publication"
  },
  {
    title: "Machine Learning Notes and Technical Reviews",
    category: "Computer Vision",
    summary:
      "Compiled technical notes and experiments on machine learning generalization, mathematical foundations, and time-dependent model behavior.",
    technologies: ["Technical documentation", "Machine learning", "Applied mathematics", "Research writing"],
    problem: "AI/ML work is difficult to evaluate without clear assumptions, documented experiments, and readable technical reasoning.",
    approach:
      "Documented model assumptions, mathematical foundations, and experiment reasoning so engineering decisions stay auditable.",
    results: ["Produced reusable ML review material", "Shows the communication discipline needed for research-heavy engineering teams"],
    impact:
      "Demonstrates technical communication, mathematical maturity, and the ability to explain model behavior to engineering audiences.",
    href: mathMlPdf,
    secondaryHref: generalizationPdf,
    tertiaryHref: timeBehaviorPdf
  }
];
