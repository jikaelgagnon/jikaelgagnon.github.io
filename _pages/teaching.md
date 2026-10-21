---
layout: page
permalink: /teaching/
title: Teaching
description: Lecture slides and course materials.
nav: true
nav_order: 3
_styles: |
  #tutorials {
    margin-top: 2rem;
  }

  .lecture-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0 2.5rem;
  }

  .lecture-card {
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

  .lecture-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 4 / 3;
    margin-bottom: 1.25rem;
    border: 1px dashed var(--global-divider-color);
    border-radius: 0.5rem;
    background: var(--global-card-bg-color);
    color: var(--global-text-color-light);
    font-size: 0.9rem;
    overflow: hidden;
  }

  img.lecture-image {
    display: block;
    height: auto;
    border: 0;
    object-fit: contain;
  }

  .lecture-card:hover,
  .lecture-card:focus-visible {
    border-color: var(--global-theme-color);
    color: var(--global-text-color);
    text-decoration: none;
    transform: translateY(-2px);
  }

  .lecture-card:focus-visible {
    outline: 2px solid var(--global-theme-color);
    outline-offset: 3px;
  }

  .lecture-number {
    color: var(--global-theme-color);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .lecture-card h4 {
    margin: 0.9rem 0 1.5rem;
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .lecture-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: auto;
    color: var(--global-text-color-light);
    font-size: 0.9rem;
  }

  .lecture-action {
    color: var(--global-theme-color);
    font-weight: 600;
  }

  @media (prefers-reduced-motion: reduce) {
    .lecture-card { transition: none; }
    .lecture-card:hover,
    .lecture-card:focus-visible { transform: none; }
  }
---

## [MAIS 202: Accelerated Introduction to Machine Learning](https://mcgillai.com/mais202)

I served as an academic lecturer for the McGill AI Society, teaching MAIS 202: Accelerated Introduction to Machine Learning. Designed to address the lack of introductory AI courses for undergraduates, this intensive ten-week course equipped a cohort of 30 students with foundational knowledge and practical skills to pursue AI roles in industry.

### Tutorials

I created and recorded these tutorials for MAIS 202 to help students pick up the basics of NumPy and PyTorch:

<div class="lecture-grid">
  <a class="lecture-card" href="https://youtu.be/uvEQohgvL1Y" aria-label="Watch Essential NumPy for Machine Learning on YouTube">
    <img class="lecture-image" src="https://i.ytimg.com/vi/uvEQohgvL1Y/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">
    <span class="lecture-number">MAIS 202</span>
    <h4>Essential NumPy for Machine Learning</h4>
    <span class="lecture-meta"><span>YouTube</span><span class="lecture-action">Watch video →</span></span>
  </a>
  <a class="lecture-card" href="https://youtu.be/-s8TzdXLLYg" aria-label="Watch Essential PyTorch for Machine Learning on YouTube">
    <img class="lecture-image" src="https://i.ytimg.com/vi/-s8TzdXLLYg/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">
    <span class="lecture-number">MAIS 202</span>
    <h4>Essential PyTorch for Machine Learning</h4>
    <span class="lecture-meta"><span>YouTube</span><span class="lecture-action">Watch video →</span></span>
  </a>
</div>

### Lectures

I created these lecture slides from scratch, emphasizing intuition and conceptual understanding over detailed mathematical derivations. The slides are intentionally detailed so students can read through them independently and revisit the material at home:

<div class="lecture-grid">
  <a class="lecture-card" href="{{ '/assets/pdf/mais-202/lecture-01.pdf' | relative_url }}" aria-label="Lecture 1: Introduction and KNNs (PDF, 131 pages)">
    {% assign lecture_image = site.static_files | where: 'path', '/assets/img/mais-202/lecture-01.png' | first %}
    {% if lecture_image %}
      <img class="lecture-image" src="{{ '/assets/img/mais-202/lecture-01.png' | relative_url }}" alt="" loading="lazy" width="640" height="480">
    {% else %}
      <span class="lecture-image" aria-hidden="true">Image placeholder</span>
    {% endif %}
    <span class="lecture-number">Lecture 1</span>
    <h4>Introduction &amp; KNNs</h4>
    <span class="lecture-meta"><span>PDF</span><span class="lecture-action">View slides →</span></span>
  </a>
  <a class="lecture-card" href="{{ '/assets/pdf/mais-202/lecture-03.pdf' | relative_url }}" aria-label="Lecture 3: Logistic regression, SGD, and mini-batching (PDF, 209 pages)">
    {% assign lecture_image = site.static_files | where: 'path', '/assets/img/mais-202/lecture-03.png' | first %}
    {% if lecture_image %}
      <img class="lecture-image" src="{{ '/assets/img/mais-202/lecture-03.png' | relative_url }}" alt="" loading="lazy" width="640" height="480">
    {% else %}
      <span class="lecture-image" aria-hidden="true">Image placeholder</span>
    {% endif %}
    <span class="lecture-number">Lecture 3</span>
    <h4>Logistic regression, SGD, and mini-batching</h4>
    <span class="lecture-meta"><span>PDF</span><span class="lecture-action">View slides →</span></span>
  </a>
  <a class="lecture-card" href="{{ '/assets/pdf/mais-202/lecture-06.pdf' | relative_url }}" aria-label="Lecture 6: Recurrent neural networks, LSTMs, and attention (PDF, 171 pages)">
    {% assign lecture_image = site.static_files | where: 'path', '/assets/img/mais-202/lecture-06.png' | first %}
    {% if lecture_image %}
      <img class="lecture-image" src="{{ '/assets/img/mais-202/lecture-06.png' | relative_url }}" alt="" loading="lazy" width="640" height="480">
    {% else %}
      <span class="lecture-image" aria-hidden="true">Image placeholder</span>
    {% endif %}
    <span class="lecture-number">Lecture 6</span>
    <h4>Recurrent neural networks, LSTMs, and attention</h4>
    <span class="lecture-meta"><span>PDF</span><span class="lecture-action">View slides →</span></span>
  </a>
  <a class="lecture-card" href="{{ '/assets/pdf/mais-202/lecture-07.pdf' | relative_url }}" aria-label="Lecture 7: Word embeddings, attention, and transformers (PDF, 157 pages)">
    {% assign lecture_image = site.static_files | where: 'path', '/assets/img/mais-202/lecture-07.png' | first %}
    {% if lecture_image %}
      <img class="lecture-image" src="{{ '/assets/img/mais-202/lecture-07.png' | relative_url }}" alt="" loading="lazy" width="640" height="480">
    {% else %}
      <span class="lecture-image" aria-hidden="true">Image placeholder</span>
    {% endif %}
    <span class="lecture-number">Lecture 7</span>
    <h4>Word embeddings, attention, and transformers</h4>
    <span class="lecture-meta"><span>PDF</span><span class="lecture-action">View slides →</span></span>
  </a>
</div>
