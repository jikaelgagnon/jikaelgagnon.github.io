---
layout: post
title: Perceptrons
date: 2024-07-11 08:57:00-0400
description: an example of a blog post with jupyter notebook
tags: formatting jupyter
categories: sample-posts
giscus_comments: true
related_posts: false
---
For my first blog post, I'd like to start at the roots of machine learning with the perceptron, since it's the basis of the multi-layer perceptron (MLP) which powers most of today's deep learning. A perceptron is a function $$f : \mathbb{R}^d \to \mathbb{R}$$ mapping vectors to scalars. For simplicity, we will write $f$ as the composition of two functions. The first function we will call $$g$$, where $$g : \mathbb{R}^d \to \mathbb{R}$$ takes a weighted sum of elements of a vector (with an optional bias term); that is, $$g(\vec{x})= \sum_i w_ix_i + b$$, where $$x_i$$ is the $$i$$th element of the vector, $$w_i$$ are scalar weights, and $$b$$ is a scalar called the "bias". The second function we will call $$\theta$$ is a non-linear function. From this point forward, however, $$\theta$$ will be defined to be the Heaviside step function $$H$$ where

$$
\begin{align}
H(x) = \left\{ \begin{array}{cc} 
                1 & x \geq 0 \\
                0 & x \lt 0 \\
                \end{array} \right.
\end{align}
$$

<div style="text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/heaviside.png" class="img-fluid rounded z-depth-1" zoomable=true width=500 %}
</div>


Thus, if we define $$f(\vec{x})=H{(g(\vec{x}))}$$, then we can rewrite $$f$$ as
$$
\begin{align}
f(\vec{x}) = \left\{ \begin{array}{cc} 
                \sum_i w_ix_i + b & x \geq 0 \\
                \sum_i w_ix_i + b & x \lt 0 \\
                \end{array} \right.
\end{align}
$$

Now the important question arises: where do the weights $$w_1, \dots w_d$$ come from?

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/lin_sep.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/lin_sep.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}



Note that the jupyter notebook supports both light and dark themes.
