import appleImg from "../../img/download (1).png";
import calgaryImg from "../../img/UCal.jpg";
import clemsonImg from "../../img/images.png";
import harriImg from "../../img/harri.jpg";
import itgImg from "../../img/ITG.jpg";
import najahImg from "../../img/najah.jpg";
import palestineImg from "../../img/palestine.png";

export const experience = [
  {
    img: calgaryImg,
    date: "September 2023 - Present",
    title: "Graduate Research Assistant",
    place: "University of Calgary - Calgary, Alberta, Canada",
    points: [
      "Implemented research software for data assimilation, state estimation, uncertainty quantification, and high-dimensional dynamical systems.",
      "Built repeatable numerical experiment pipelines for model comparison, diagnostics, and validation.",
      "Worked with noisy observation data and estimation methods that map directly to perception, tracking, LiDAR, and robotics software problems."
    ]
  },
  {
    img: itgImg,
    date: "February 2023 - August 2023",
    title: "Backend Engineer - Python",
    place: "ITG Software Engineering - Cincinnati, Ohio, United States - Remote",
    points: [
      "Developed Python backend features for a subscription analytics product.",
      "Integrated Google Analytics and BigQuery data flows for reporting and product analytics.",
      "Implemented structured backend logic to make analytics data easier to query, review, and use in product decisions."
    ]
  },
  {
    img: harriImg,
    date: "January 2022 - February 2023",
    title: "AI/ML and Data Science Engineering Intern",
    place: "Harri - New York and Ramallah",
    points: [
      "Developed time-series forecasting workflows for hiring demand analysis.",
      "Implemented Django services that connected model outputs with backend application behavior.",
      "Worked across preprocessing, feature preparation, model evaluation, and integration for applied AI/ML use cases."
    ]
  },
  {
    img: clemsonImg,
    date: "October 2021 - May 2022",
    title: "Undergraduate Researcher",
    place: "Future Computing Technologies Lab, Clemson University",
    points: [
      "Built real-time emotion-recognition experiments with TensorFlow and OpenCV.",
      "Implemented computer vision baselines and evaluation workflows, including FER-7 and Haar cascade experiments.",
      "Gained practical experience with visual data pipelines, model behavior, and perception-oriented application logic."
    ]
  },
  {
    img: appleImg,
    date: "May 2021 - October 2021",
    title: "SWE Intern",
    place: "Apple Inc - Ramallah, West Bank, Palestine",
    points: [
      "Developed internal inventory and lab-management workflows with Django and React.",
      "Built data input and output flows for operational users.",
      "Worked across frontend behavior, backend structure, and data organization in a full-stack software environment."
    ]
  }
];

export const education = [
  {
    img: calgaryImg,
    date: "September 2023 - June 2025",
    title: "University of Calgary",
    place: "MSc, Mechanical Engineering - Computational Applied Mathematics",
    points: [
      "Focused on numerical computing, machine learning for dynamical systems, uncertainty quantification, and applied software for scientific data.",
      "Developed research software for data assimilation and state estimation, with direct relevance to sensor processing and perception systems."
    ]
  },
  {
    img: najahImg,
    date: "August 2018 - January 2023",
    title: "An-Najah National University",
    place: "BSc, Computer Engineering",
    points: [
      "Built foundations in programming, algorithms, databases, software design, computer systems, and hardware/software integration.",
      "Completed software and hardware capstone projects, including CookOverflow and an Electrical Circuit Builder."
    ]
  },
  {
    img: palestineImg,
    date: "September 2005 - July 2017",
    title: "Palestine Ministry of Education and Higher Education",
    place: "Secondary education",
    points: [
      "Ranked first among 75,000 students with a 99.7% score.",
      "Developed strong mathematics and analytical problem-solving foundations."
    ]
  }
];
