---
layout: page
permalink: /projects/
title: Projects
description: Research and software projects.
nav: true
nav_order: 2
_styles: |
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0 2.5rem;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    min-height: 210px;
    padding: 1.5rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 0.75rem;
    background: var(--global-card-bg-color);
    color: var(--global-text-color);
    text-decoration: none;
    transition: border-color 150ms ease, transform 150ms ease;
  }

  .project-card:hover,
  .project-card:focus-visible,
  .project-card:focus-within {
    border-color: var(--global-theme-color);
    color: var(--global-text-color);
    text-decoration: none;
    transform: translateY(-2px);
  }

  .project-card:focus-visible,
  .project-card:focus-within {
    outline: 2px solid var(--global-theme-color);
    outline-offset: 3px;
  }

  .project-card--with-link {
    position: relative;
  }

  .project-card--with-link .project-action {
    text-decoration: none;
  }

  .project-card--with-link .project-action::after {
    content: "";
    position: absolute;
    inset: 0;
  }

  .project-card--with-link p a {
    position: relative;
    z-index: 1;
  }

  .project-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin-bottom: 1.25rem;
    overflow: hidden;
    border-radius: 0.5rem;
    background: var(--global-card-bg-color);
  }

  .project-preview img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .project-card h2 {
    margin: 0 0 1rem;
    font-size: 1.35rem;
  }

  .project-card p {
    margin-bottom: 1.5rem;
  }

  .project-action {
    margin-top: auto;
    color: var(--global-theme-color);
    font-weight: 700;
  }

  @media (prefers-reduced-motion: reduce) {
    .project-card { transition: none; }
    .project-card:hover,
    .project-card:focus-visible,
    .project-card:focus-within { transform: none; }
  }
---

<div class="project-grid">
  <div class="project-card project-card--with-link">
    <span class="project-preview">
      <img src="https://raw.githubusercontent.com/arnab39/equiadapt/main/utils/equiadapt_sam.gif" alt="EquiAdapt preview" loading="lazy" width="640" height="360">
    </span>
    <h2>EquiAdapt</h2>
    <p><strong>Work completed at <a href="https://mila.quebec/en">Mila</a>.</strong></p>
    <p>A PyTorch library for making existing neural networks equivariant by learning to canonicalize transformed inputs, based on <a href="https://arxiv.org/pdf/2310.01647">Mondal et al.</a> </p>
    <a class="project-action" href="https://github.com/arnab39/equiadapt" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
  </div>

  <div class="project-card project-card--with-link">
    <span class="project-preview">
      <img src="https://alexjbrinson.github.io/ComputationalPhysicsLab/nBodySimulator/nBodyWithTraceHistory.gif" alt="N-body simulation with particle trails" loading="lazy" width="640" height="360">
    </span>
    <h2>Fixed-Horizon State Prediction for the N-Body Problem with Learned Canonicalization</h2>
    <p><strong>Work completed at <a href="https://mila.quebec/en">Mila</a>.</strong></p>
    <p>Using learned canonicalization from <a href="https://arxiv.org/abs/2211.06489">Kaba et al.</a> with a Transformer to predict fixed-horizon state for the N-body problem.</p>
    <a class="project-action" href="https://github.com/jikaelgagnon/canonical_network" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
  </div>

  <a class="project-card" href="https://github.com/jikaelgagnon/markov-logger-extension" target="_blank" rel="noopener noreferrer">
    <span class="project-preview">
      <img src="https://github.com/jikaelgagnon/markov-logger-extension/raw/main/img/markov_graph.png" alt="Markov Logger graph preview" loading="lazy" width="640" height="360">
    </span>
    <h2>Markov Logger</h2>
    <p>A Chrome extension for researchers to log website interactions and navigation during experiments, with configurable event tracking and Firebase storage.</p>
    <span class="project-action">View on GitHub →</span>
  </a>

  <a class="project-card" href="https://store.steampowered.com/app/3492730/Agora/" target="_blank" rel="noopener noreferrer">
    <span class="project-preview">
      <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3492730/header.jpg?t=1742045159" alt="Agora preview" loading="lazy" width="640" height="360">
    </span>
    <h2>Agora</h2>
    <p>A digital board game platform with immersive 3D spaces, built-in rules, and a place to discover and play games with others.</p>
    <span class="project-action">View on Steam →</span>
  </a>
</div>
