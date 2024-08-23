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
Note: The following is heavily inspired by the second chapter of "Why Machines Learn: The Elegant Math Behind Modern AI" by Anil Ananthaswamy.

For my first blog post, I'd like to start at the roots of machine learning with the perceptron, since it's the basis of the multi-layer perceptron (MLP) which powers most of today's deep learning. A perceptron is a function $$f : \mathbb{R}^d \to \mathbb{R}$$ mapping vectors to scalars. For simplicity, we will write $$f$$ as the composition of two functions. The first function we will call $$g$$, where $$g : \mathbb{R}^d \to \mathbb{R}$$ computes a weighted sum of elements of a vector (with an optional bias term); that is, $$g(\vec{x})= \sum_i w_ix_i + b$$, where $$x_i$$ is the $$i$$th element of the vector, $$w_i$$ are scalar weights, and $$b$$ is a scalar called the "bias". The second function we will call $$\theta$$ is a non-linear function. In this example we will define $$\theta$$ as

$$
\begin{align}
\theta(x) = \left\{ \begin{array}{cc} 
                1 & x \gt 0 \\
                -1 & x \leq 0 \\
                \end{array} \right.
\end{align}
$$

Thus, if we define $$f(\vec{x})=\theta{(g(\vec{x}))}$$, then we can rewrite $$f$$ as
$$
\begin{align}
f(\vec{x}) = g(\theta(\vec{x})) 
= \left\{ \begin{array}{cc} 
                 1 & \sum_i w_ix_i + b \gt 0 \\
                 -1 & \sum_i w_ix_i + b \leq 0\\
                \end{array} \right.
= \left\{ \begin{array}{cc} 
                 1 & \sum_i w_ix_i \gt -b \\
                 -1 & \sum_i w_ix_i \leq -b \\
                \end{array} \right.
\end{align}
$$

Ok, so now what can we do with this perceptron? We can use it as a _linear classifier_ which means a function which can "classify using a line" (more on this later). A classic example of a dataset that can be linearly classified is the Iris dataset, where each row in the dataset contains measurements of a flower and the task is to predict the species of the flower (which is either Versicolor, Setosa, or Virginica). 

<div style="text-align: center">
{% include figure.liquid loading="eager" path="assets/img/iris_images.svg" class="img-fluid rounded z-depth-1" zoomable=true width=500 %}
</div>

To keep things simple, let's just take two measurments: sepal length and sepal width; given these measurements we will try to classify it as either Versicolor or Setosa (we will just ignore all the rows containing data about Virginica flowers). So how does this work? Our inputs will be a vector $$\vec{x}=[x_1,x_2]$$ where $$x_1$$ is the sepal length and $$x_2$$ is the sepal width. Next, we assign a number to represent each class: let's let $$-1$$ represent Versicolor and $$1$$ to represent Setosa. This means if $$f(\vec{x}) = -1$$ then we predict that $$\vec{x}$$ is a Versicolor (and the opposite for $$1$$). 

To get a feel for this let's look at an example. Let $$\vec{x} = [x_1, x_2] = [1,2], [w_1, w_2, b] = [-1, 1/2, 1/3]$$, 

then $$f(\vec{x}) = \theta{(w_1x_1 + w_2x_2 + b)} = \theta({-1*1 + (1/2)*2 + 1/3}) = \theta{(1/3)} = 1$$.

Thus, our perceptron labels a flower with sepal length 1 and sepal width 2 to be in the class Setosa. 

# STOPPED WRITING HERE...

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
