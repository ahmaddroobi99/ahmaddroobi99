# Ahmad Droobi

Scientific computing · data assimilation · perception systems.

I build software that connects physical models, sparse observations, and reconstruction — and the engineering around that: cameras, control loops, and research tools that actually run.

MSc (2025), University of Calgary. Computer engineering before that.

<p>
  <a href="https://www.linkedin.com/in/droobi7/"><b>LinkedIn</b></a>
  · <a href="https://github.com/ahmaddroobi99">GitHub</a>
  · <a href="https://scholar.google.com/citations?user=H-3pF00AAAAJ">Scholar</a>
  · <a href="https://ucalgary.scholaris.ca/items/b4a3d3b9-4fbf-4d1e-8e1e-80c71c009825">Thesis</a>
  · <a href="https://ahmaddroobi99.github.io/">Portfolio</a>
  · <a href="https://x.com/AhmadDroobi99">X</a>
  · <a href="https://github.com/ahmaddroobi99/projects">Index</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ahmaddroobi99/qg-lada-lab/main/docs/demo.png" alt="QG Lagrangian DA lab" width="48%" />
  <img src="https://raw.githubusercontent.com/ahmaddroobi99/axis-vision-pan-tilt/main/docs/media/hero.jpg" alt="AXIS pan/tilt console" width="48%" />
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/ahmaddroobi99/ai-perception-lab/main/docs/demo/camera.jpg" alt="Perception lab camera stage" width="48%" />
  <img src="https://raw.githubusercontent.com/ahmaddroobi99/meridian/main/docs/demo.png" alt="Meridian research terminal" width="48%" />
</p>

Live captures. Not mockups.

```
Hardware / sensors
        ↓
Real-time software
        ↓
Estimation / control / filters
        ↓
Simulation + visualization
        ↓
Research software that runs
```

GitHub cannot custom-sort the Repositories tab. This profile is the catalog: **research first, undergraduate last**. Homework from 2020–2022 is archived. Pins are the six to open first. Same grouping: [`projects`](https://github.com/ahmaddroobi99/projects).

---

## Current focus

Public research lab for Lagrangian data assimilation, a software-verified vision pan/tilt control stack, and perception tooling. Looking for engineering roles where models, sensors, and software have to meet.

---

## Featured

| Repo | What you will actually find |
| --- | --- |
| **[qg-lada-lab](https://github.com/ahmaddroobi99/qg-lada-lab)** | Spectral QG twin + localized EnKF in the browser, plus a committed Python solver. Demo-scale XCOR 0.964 on N = 32 (not the thesis table). **[Live](https://qg-lada-lab.netlify.app)** |
| **[local_wccm](https://github.com/ahmaddroobi99/local_wccm)** | MATLAB working copy of the barotropic Lagrangian filter (`lagrangianfilter_baro.m`, spectra, drivers). |
| **[axis-vision-pan-tilt](https://github.com/ahmaddroobi99/axis-vision-pan-tilt)** | Vision → UART → STM32 STEP/DIR design. Software verified. Hardware not bench-tested. **[Live](https://axis-vision-pan-tilt.netlify.app)** |
| **[ai-perception-lab](https://github.com/ahmaddroobi99/ai-perception-lab)** | Local-first camera workstation. Real COCO-SSD in the browser. Simulated fleet KPIs are labeled. |
| **[meridian](https://github.com/ahmaddroobi99/meridian)** | Research terminal. Ranks papers and artifacts by technical depth, not virality. **[Live](https://meridian-research-terminal.netlify.app)** |
| **[computer_Architecture_Project_Piplined-_CPU_2021](https://github.com/ahmaddroobi99/computer_Architecture_Project_Piplined-_CPU_2021)** | Verilog pipelined MIPS: forwarding, stall, flush, testbench. Student CPU. |

```
Lagrangian drifters  →  QG barotropic model (q = ∇²ψ − μψ)
                     →  spectral Helmholtz inversion
                     →  localized stochastic EnKF  (+ optional EnKF–PF)
                     →  reconstructed Eulerian field, spectra, XCOR
```

Thesis: *Data-Driven Filtering Techniques for Turbulent Flow Models (A Lagrangian Data Assimilation Approach)* ([Scholaris](https://ucalgary.scholaris.ca/items/b4a3d3b9-4fbf-4d1e-8e1e-80c71c009825)). Private thesis sources stay private.

---

## Also public

**Perception / control.** [vla-drive-sim](https://github.com/ahmaddroobi99/vla-drive-sim) is a pedagogical driving loop (language selects a path; vision is heading error; PD emits actions). Not a trained VLA.

**Research software.** [lattice](https://github.com/ahmaddroobi99/lattice) · [engineering-portfolio](https://github.com/ahmaddroobi99/engineering-portfolio) · [world-pulse](https://github.com/ahmaddroobi99/world-pulse)

**Maps / study notes.** Catalogs and seminar reconstructions (`found-300`, `36-key-cv-topics`, `robot-data-gap-gofe`, and similar) are reading maps. They are not implementations. See the [index](https://github.com/ahmaddroobi99/projects).

**Experiments.** Honest about what is committed: [ridgeflight](https://github.com/ahmaddroobi99/ridgeflight), [tensortonic-rag-from-scratch](https://github.com/ahmaddroobi99/tensortonic-rag-from-scratch), [mosqguard](https://github.com/ahmaddroobi99/mosqguard), [forge-mind](https://github.com/ahmaddroobi99/forge-mind), [aws-from-scratch](https://github.com/ahmaddroobi99/aws-from-scratch), [aetherforge](https://github.com/ahmaddroobi99/aetherforge) (no `src/` yet).

---

## Undergraduate (last)

BSc Computer Engineering, An-Najah National University, 2023. Provenance, not current work.

- [seniorGraduationProject2022_cookOverflow](https://github.com/ahmaddroobi99/seniorGraduationProject2022_cookOverflow) — Django recipe site + recommender R&D
- [cookoverflow_Mobile_GradProject_2022](https://github.com/ahmaddroobi99/cookoverflow_Mobile_GradProject_2022) — Flutter client
- [SoftwareProject_2021_Agile_Trello](https://github.com/ahmaddroobi99/SoftwareProject_2021_Agile_Trello) — PayMe Java Swing e-wallet (not Trello)
- [Messnger_FileTransfer_StopAndWaitProtocol_UDP](https://github.com/ahmaddroobi99/Messnger_FileTransfer_StopAndWaitProtocol_UDP) — Java UDP + Stop-and-Wait 3.0

---

## What I can defend in an interview

- **Data assimilation** — EnKF, particle filters, hybrid EnKF–PF, localization, inflation, Lagrangian observations
- **Geophysical models** — barotropic QG, shallow-water, Lorenz-63 / L96 as reduced-order tests
- **Scientific computing** — spectral methods, Helmholtz inversion, Python and MATLAB
- **Uncertainty quantification** — filtering, stochastic forcing, spectra, reconstruction skill
- **Perception and control design** — camera pipelines, in-browser detection, UART protocol, PID with safety interlocks (software-verified)
- **Software** — Python, TypeScript/React, MATLAB, Verilog, experiments other people can rerun

Forks of DAPPER, PyDA, torchda, and similar are **reference**, not original work.

---

## Background

- **MSc**, University of Calgary, 2025 — scientific ML / Lagrangian DA / UQ
- **BSc Computer Engineering**, An-Najah National University, 2023

[linkedin.com/in/droobi7](https://www.linkedin.com/in/droobi7/) · [Scholar](https://scholar.google.com/citations?user=H-3pF00AAAAJ)
