---
layout: post
title: Stats and probability theory I wished I learned before ML
date: 2025-07-07
description: Covering important aspects of statistics and probability that are frequently glossed over in ML teaching.
categories: ml, stats, learning
related_posts: false
---

# Overview
The goal of this blog is to go over some important concepts in statistics and probability theory that should be well understood to get a stronger grasp on machine learning. This blog post assumes the following prequisite knowledge:
1. A strong grasp on math notation
2. Basic probability theory (eg. Kolmogorov axioms, CDF, PDF)
3. Basic linear algebra (eg. vectors, matrices, vector spaces, bases, coordinates, and eigenvalues/vectors)
2. Being able to read NumPy code.

I will begin with crucial basics and work up to some other important concepts.This post combines theory and code; you learn the concept using math and see it in action using code.

# The basics
## Expected value
For a random variable $X$, the **expected value** of $X$, denoted $\mathbb{E}[X]$ is the value you would **expect** if you averaged over an infinite number of trials. The way in which this is computed depends on whether $X$ is a discrete or a continuous random variable. 

### Discrete case
When $X$ is a random variable with a finite list of possible outcomes, $x_1, x_2, \dots, x_N$, then 

$$\mathbb{E}[X] = \sum_{i=1}^N P(X=x_i) x_i$$

This can be seen as a weighted sum of values, where the weight for $x_i$ is $P(X=x_i)$, so values that are more likely will contribute to the sum. 

#### Example
Let $X = 0$ denote a coinflip of heads, and $X = 1$ denote tails, where $P(X = 0) = P(X = 1) = 1/2$, then our expected value should be directly in the middle of zero and one, since each outcome has the same probability (or weight); indeed, when we plug this into the equation above, we see that 

$$E[X] = 0*P(X = 0) + 1*P(X = 1) = 0*(1/2) + 1*(1/2) =1/2$$

Now, what if instead we had a biased coin? That is, what if one outcome was much more likely than the other? For example, let's set $P(X = 0) = 0.1$ and $P(X = 1) = 0.9$. In this case, our expected value should be much closer to 1 than 0.9, since tails is a lot more likely. Once again, we see that the the output of the equation matches our intuition:

$$E[X] = 0*P(X = 0) + 1*P(X = 1) = 0*(0.1) + 1*(0.9) = 0.9$$

### Continuous case

#### The notion of likelihood
In the continuous case, we have an infinite number of possible outcomes, which means that $P(X=x) = 0$ for all possible $x$. To build intuition, consider a proof by contradiction. Suppose there exists some nonzero probability $\epsilon_x > 0$ assigned to each individual outcome $x$. Then, summing over an infinite number of such outcomes would yield an infinite total probability:

$$\sum_{x \in \mathbb{R}} P(X = x) = \sum_{x \in \mathbb{R}} \epsilon_x = \infty$$

which contradicts the requirement that the total probability over the sample space must equal 1. Therefore, the only consistent assignment is that each individual outcome has probability 0. 

You might be thinking "Ok, I understand why probabilities are zero, but surely there are some events that are more likely than others". This is indeed true. For example, in theory, height is a continuous random variable; there are certainly some heights that are more common than others. This idea is captured through the notion of **likelihood**. For each possible value of $x$, we can assign a value $p(x) \geq 0$ which represents how likely we are to observe $x$ (it is very important to keep in mind that it's not actually the *probability* of $x$). We add the additional restriction that $\int_{-\infty}^{+\infty}p(x)dx = 1$ (so the area under the likelihood curve is 1). 

#### Coming up with an equation for expected value
Recall that earlier our expected value was computed as a weighted sum of values, where the weights are point probabilities. In the continuous case, we have seen that probabilities are swapped out for likelihoods, and since we have an infinite number of values, we should take an integral. Thus, our expected value can be written as 

$$E[X] = \int_{-\infty}^{+\infty}p(x)xdx$$

Again, the idea here is that the points with higher likelihood have a greater weight in the computing the expected value. 



#### Example

> ##### Important Note
>
> A concept that is often glossed over is that in practice we typically don't compute the actual expected value, since that would require knowing the true underlying distribution of our data (which is often unrealistic). Instead, we estimate it using an **unbiased estimator**. This is a value that we can compute using our dataset that _estimates_ the true value of some parameter; as the amount of data increases, we approach the true value. More formally, an estimator $\hat{\theta}$ is said to be *unbiased* for parameter $\theta$ if $\mathbb{E}[\hat{\theta}] = \theta$. For example, suppose we are trying to estimate $\mu_X = \mathbb{E}[X]$; it can be shown that the sample mean $\bar{X} = \frac{1}{N} \sum_{i=1}^N x^{(i)}$ is an unbiased estimator of $\mu_X$ (so $\mathbb{E}[\bar{X}] = \mu_X$). As we will see later, unbiased estimators also exist for many other parameters (such as the variance and covariance).
{: .block-warning }

For the continuous case, showing a worked out example is a bit trickier. Instead, we will take some real world data and *estimate* the expected value using an unbiased estimator. An unbiased estimator for the expected value is the sample mean (typically denoted $\bar{X}$):

$$\bar{X} = \frac{1}{N} \sum_{i = 1}^N x^{(i)}$$

Again, remember that this is not actually the expected value. This is a value we can compute to estimate the expected value.

For our real world data, I downloaded [height and weight data from Kaggle](https://www.kaggle.com/datasets/mustafaali96/weight-height). For now, we will focus on only the height data.

First, it would be nice to plot the probabilities of each height; the problem is that heights are a continous variable, so the probability of an exact height is very low (eg. the odds that someone has a height of 66.72 inches is quite low, but the probability of a height *close to* 66.72 might be quite high). To deal with this, we will group our data points into *bins*. These are simply intervals in the data; thus, instead of counting the probability of an exact value, we will compute the probability that a point falls into a bin. Here is a visualization of our data being split into $n=30$ bins, where the boundaries of the bins are marked by red-dotted lines:

{% include figure.liquid path="../assets/img/bins.png" class="img-fluid rounded z-depth-1" zoomable=true %}

Using the same bins, we can plot the density of our data (where density for a bin is ( of points in bin) / (total  of points)):

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


df = pd.read_csv("./heights/SOCR-HeightWeight.csv")
heights = df["Height(Inches)"].to_numpy()
n_bins = 30
bin_centers, probabilities = split_bins_and_probabilities(heights, n_bins)

 Plot the histogram
plt.hist(heights, bins=30, density=True, alpha=0.5)
plt.xlabel('Height')
plt.ylabel('Density')
plt.title(f"Height densities with n={n_bins} bins")
plt.show()
```

{% include figure.liquid path="../assets/img/height_density.png" class="img-fluid rounded z-depth-1" zoomable=true %}

Now that the concept of bins is (hopefully) clear, the plot should hopefully make sense. Now we can simply compute the expected value. As seen above, we can simply do this by calculating the mean

```python
def E(X):
    return np.mean(X)

E(heights)  returns 67.99
```

Using this, let's plot our data again, this time including the mean:

```python
E_height = E(heights)

plt.hist(heights, density=True, bins=n_bins, alpha=0.5)
plt.axvline(x=E_height, color='red', linestyle='--', linewidth=2, label=f'Expected value: {E_height:.2f}')

plt.legend()
plt.xlabel('Height')
plt.ylabel('Density')
plt.title('Distribution of Heights')

plt.show()
```


{% include figure.liquid path="../assets/img/heights_with_mean.png" class="img-fluid rounded z-depth-1" zoomable=true %}

In this case, our expected value is roughly $68$, which seems to be roughly at the peak of our data. Importantly, note that the expected value will not *always* be at the peak of the data; the reason it's in at the peak in this case is because the data is symmetrical around the peak.

### Expected Value of the Function of a Random Variable

When reading machine learning material, you will see expected value come up *a lot*, but in many cases the notation will look much more complex; for example, $\mathbb{E}[\mathbb{H}(X)] = \int_{\infty}^{\infty} p(x)\mathbb{H}(x)dx$. Do not let this scare you. This is the expected value of a function of a random variable. The concepts here are identical to before: we want to know the value if we average over an infinite number of trials. The only difference here is that before we were looking at the expected value of $X$, and now we're looking at the expected value of some function of $X$. So to find the average of $\mathbb{H}(x)$ over an infinite number of trials, we multiply $\mathbb{H}(x)$ by the likelihood of the input, $p(x)$. 

#### Example
Let's dig a bit deeper by looking at the example from above. We will take the height of each person and double it. That is, we will apply the function $f(x) = 2x$ to each height in our dataset, and we will compute the new expected value. Before doing this, can you guess what it will be? 

```python
def f(x):
    return 2*x

E_f = E(f(heights))

plt.hist(f(heights), density=True, bins=30, alpha=0.5)
plt.axvline(x=E_f, color='red', linestyle='--', linewidth=2, label=f'Expected value: {E_f:.2f}')

plt.legend()
plt.xlabel('Double Height')
plt.ylabel('Density')
plt.title('Distribution of f(x) = 2x')

plt.show()

```

{% include figure.liquid path="assets/img/scaled_heights.png" class="img-fluid rounded z-depth-1" zoomable=true %}

The new expected value $\mathbb{E}[f(X)] = \mathbb{E}[2X]$ is twice the mean from before! This makes sense, since each input of $f$ maps to a unique output, the distribution should remain the same, but with each value doubled (ie. if $x_i$ has likelihood $p_i$ in our original data, then $f(x_i)$ will have the same likelihood in the our new data).


### Key Takeaways on Expected Value
1. Expected value tells you the value you would *expect* is you averaged over the outcome of an infinite number of trials. In other words, it's a theoretical *mean* of the data (as such, the terms mean and expected value are often interchangeable).
2. You can take the expected value of functions of random variables.
3. You can estimate the expected value using the sample mean $\bar{X}$.

## Variance
For a variable random variable $X$, the *variance* of $X$ is $\text{Var}(X) = \sigma^2_X = \mathbb{E}[(x - \mathbb{E}[X])^2)]$. This can be read as the average squared difference from the mean. Note this is *squared*, meaning the variance must be positive. Intuitively, this measures the spread of the data, or how much it *varies* from the mean. To make this slightly more readable, we will denote the expected value of $X$ as $\mathbb{E}[X] = \mu_X$; this is common notation. Notice that the variance is the expected value of function of a random variable. In this case, it's the function $f(X) = (X - \mu_X)^2$ (where we used our new notation for the mean). Thus, all the same ideas from above still apply; namely, that the way in which this is computed will depend on whether $X$ is a dicrete or a continuous random variable. 

In the discrete case:

$$\sigma^2_X = \mathbb{E}[(X - \mu_X)^2] = \sum_{i=1}^N P(X=x_i) (x_i - \mu_X)^2$$

In the continuous case:

$$\sigma^2_X = E[(X - \mu_X)^2] = \int_{-\infty}^{+\infty}p(x)(x - \mu_X)^2dx$$


### Example
Let's look at this in action by jumping back into our example of height data. Again, we will be using an unbiased estimator for the variance. In this case, the unbiased estimator for the variance is the sample variance, often denoted $S^2$:

$$S^2 = \frac{1}{N-1} \sum_{i = 1}^N(x^{(i)} - \bar{X})$$

note that the reason we divide by $n-1$ is not immediately obvious and is beyond the scope of this blog.

We can now start our investigation by writing a function that computes the sample variance. Again, this is pretty straightforward.

```python
def V(X):
    mu = E(X)
    squared_diffs = np.sum((X - E(X))**2)
    s_2 = squared_diffs / (len(X) - 1)
    return s_2

V(heights)  3.62
```

Again, it's important to note that variance gives us the average *squared* difference from the mean. To get the non-squared difference you can take the square root of the variance, $\sqrt{Var(X)} = \sqrt{\sigma_X^2} = \sigma_X$; this value is so frequently used that it has a name: the *standard deviation*. Let's visualize our data with the variance to see the regions that are one standard deviation to the left and right of the mean:

```python
 Compute expected value and variance from the raw data
E_height = E(heights)
var_height = V(heights)
std_height = np.sqrt(var_height)
 Plot histogram
plt.hist(heights, density=True, bins=n_bins, alpha=0.5)
 Expected value line
plt.axvline(x=E_height, color='red', linestyle='--', linewidth=2, label=f'Expected value: {E_height:.2f}')
 Variance range lines (±1 std dev)
plt.axvline(x=E_height - std_height, color='blue', linestyle=':', linewidth=2, label=f'-1σ: {E_height - std_height:.2f}')
plt.axvline(x=E_height + std_height, color='blue', linestyle=':', linewidth=2, label=f'+1σ: {E_height + std_height:.2f}')
 Labels and legend
plt.legend()
plt.xlabel('Height')
plt.ylabel('Density')
plt.title('Distribution of Heights with Expected Value and Variance')
plt.show()

```

{% include figure.liquid path="assets/img/height_with_variance.png" class="img-fluid rounded z-depth-1" zoomable=true %}

If our data were more closely centered around the mean, our variance would be smaller, and if it were more spread out, the variance would be larger.

### Key Takeaways on Variance
1. Variance tells you the expected squared distance from the mean. 
2. Variance is the expectation of a function of a random variable.
3. Variance can be estimated using sample variance $S^2$.

## Higher dimensional data

### Expected value in higher dimensions

In machine learning, we often deal with higher dimensional data. For example, our input data might contain the heights and weights of various individuals. In this case, each of our data point can be represented as 2D vector, where the first element is the height and the second is the weight. That is, our dataset is a set of points $x^{(i)} = [x^{(i)}_1, x^{(i)}_2]$, where $x^{(i)}_1$ is the height of invidual $i$ and $x^{(i)}_2$ is their weight. In this case, instead of computing a scalar for the expected value, we compute a vector $\vec{mu_X} = [\mu_{x_1}, \mu_{x_2}]$, where $\mu_{x_1}$ is the expected value looking only at height, and $\mu_{x_2}$ is the mean looking only at weight.

### Vectorizing our equations

In machine learning, we often deal with high-dimensional data (ie. our data points are usually high-dimensional vectors). In machine learning, we will often vectorize equations to create concise versions of equations that scale to any dimensionality (also, when programming, vectorized equations allow you to avoid loops, often making code faster and easier to read). Accordingly, *you should get comfortable with vector notation*. In the remainder of this blog I will first introduce equations in their "scalar form" and then re-write in their vector notation. It might be helpful to first look at scalar equations, try to figure out the vectorized form, then look to see if you were right.

Let's start this off with the simplest example: the sample mean, $\bar{X}$.

Recall the equation for the sample mean: 


$$\bar{X} = \frac{1}{N} \sum_{i = 1}^N x^{(i)}$$

How can we write this in vector form? If our data is a set on $n$ 1D datapoints, $X \in \mathbb{R}^{N \times 1}$, we can compute the sample mean mean as dot product:

$$\bar{X} = \frac{1}{N}\mathbb{1}^TX = \frac{1}{N}(1 \cdot x^{(1)} + \dots + 1 \cdot x^{(N)}) = \frac{1}{N}\sum_{i=1}^{N} x^{(i)}$$ 

where $\mathbb{1} \in \mathbb{R}^{n \times 1}$ is a vector of ones. Now what if we want to generalize this even further? That is, what if our data points aren't just 1D, but $d$-dimensional? Suppose we have a dataset $X \in \mathbb{R}^{n \times d}$. It turns out we can do the exact same thing! The result is now a $1 \times d$ vector where

$$
\bar{X}_j = \frac{1}{N} \sum_{i = 1}^{N} x_j^{(i)}
$$

In words, the $j$-th component is the mean of the $j$-th feature. In other words, we have computed the mean of each column of our dataset.


```python
def E(X):
    N = len(X)
    mean = (1 / N) * np.ones(N).T @ X
    return mean
```

#### Example
Again, let's understand this via an example. This time, we will need 2D data. Luckily, the data from earlier contains both the heights and weights of individuals. To start, we will simply plot our data to visualize it.

We can easily compute our expected value vector using the equation above:

```python
 Get the data
df = pd.read_csv("./heights/SOCR-HeightWeight.csv")
heights = df["Height(Inches)"].to_numpy()
weights = df["Weight(Pounds)"].to_numpy()
X = np.array([heights, weights]).T

mu_height, mu_weight = E(X)

 Plot raw data
plt.scatter(heights, weights, alpha=0.2, s=10, color="blue", marker="x", label='Raw data')

 Plot mean point
plt.scatter(mu_height, mu_weight, color="red", s=100, label='Mean vector (μ)', marker='o')

 Annotate mean (optional)
plt.annotate(f"μ = ({mu_height:.1f}, {mu_weight:.1f})", 
             (mu_height, mu_weight),
             textcoords="offset points",
             xytext=(10,10), 
             ha='left',
             fontsize=12,
             color="red")

 Labels and legend
plt.xlabel("Height (Inches)")
plt.ylabel("Weight (Pounds)")
plt.legend()
plt.title("Height vs. Weight with Mean Vector")
plt.show()
```

{% include figure.liquid path="assets/img/height_weight.png" class="img-fluid rounded z-depth-1" zoomable=true %}

As we saw above, the mean can be generalized to $d$-dimensions. The subsequent section will go over covariance, which is the higherdimensional generalization of variance.  

### Key Takeaways on Higher Dimensional Data
1. Machine learning uses a lot of high dimensional data
2. We can treat each feature as its own random variable
3. It's important to understand vecorized equations

## Covariance
The *covariance* between two random variables $X$ and $Y$ is $\text{Cov}(X,Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)]$. This equation takes every possible pair of $X$ and $Y$ and takes the product of their differences from their respective means. Intuitively, if this is:
1. Positive it means that on average, when $X$ is greater than its mean, so is $Y$ (and vice-versa), which means they grow in the same direction.
2. Negative means that on average, when $X$ is above its mean then $Y$ is below (or vice-versa), which means they grow in opposite directions.
3. Close to 0 means neither of the above are true, so it must mean there is no relationship in the direction in which they grow (not the same nor the opposite)

{% include figure.liquid path="assets/img/covariance.png" class="img-fluid rounded z-depth-1" zoomable=true %}

As usual, the way in which this is computed depends on whether we're in the discrete or continuous case:

In the discrete case:

$$\text{Cov}(X,Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)] = \sum_{i=1}^N \sum_{j=1}^M P(X=x_i, Y=y_j) (x_i - \mu_X)(y_j - \mu_Y)$$

In the continuous case:

$$\text{Cov}(X,Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)] = \int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}p(x,y)(x - \mu_X)(y - \mu_Y)dxdy$$

Note that $\text{Cov}(X,X) = \text{Var}(X)$.

When working with higher dimensional data, we are interested in the covariance between all combinations of random variables. This introduces the notion of the *covariance matrix*, $\Sigma$. Given random variables $X_1, \dots, X_d$ we define $\Sigma \in \mathbb{R}^{d \times d}$ such that

$$\Sigma_{i,j} = \text{Cov}(X_i, X_j)$$

This definition implies that the elements on the main diagonal are of the form $\Sigma_{i,i} = \text{Cov}(X_i, X_i) = \text{Var}(X_i)$. We will do a much deeper dive into the covariance matrix later.

### Unbiased estimator and vectorized version

As usual, we will not actually compute the covariance / covariance matiex. Instead, we will use an unbiased estimator. This time it's the estimator $S_{XY}$:

$$S_{XY} = \frac{1}{N-1} \sum_{i=1}^{N}(X - \bar{X})(Y - \bar{Y})$$

Again, let's start with the simplest case and work our way up. So, we will start by seeing how we can vectorize variance (which is just a special case of covariance). If our data is a set of $n$ 1D datapoints, $X \in \mathbb{R}^{N \times 1}$, we can compute the sample variance as a dot product:

$$S^2 = \frac{1}{N - 1} (X - \bar{X})^T(X - \bar{X})^T = \frac{1}{N - 1} [(x^{(1)} - \bar{X}) \cdot (x^{(1)} - \bar{X}) + \dots + (x^{(N)} - \bar{X}) \cdot (x^{(N)} - \bar{X})] = \frac{1}{N-1} \sum_{i=1}^{N}(x^{(i)} - \bar{X})^2$$

Again, it turns out that this exact same formulation generalizes to $d$-dimensional data, where 

$$S^2_{k,j} = \frac{1}{N-1} \sum_{i=1}^{N}(x^{(i)}_k - \bar{X}_k)(x^{(i)}_j - \bar{X}_j)$$

Using code, we can compute the covariance matrix:

```python
def Cov(X):
    n = X.shape[0]
    mean = E(X)
    diff = (X - mean)
    cov = 1/(n-1) * diff.T @ diff
    return cov
```

### Example

Let's look at each of the values in the covariance matrix for our height and weight data:

```python
Cov(heights, weights)
```
```
array([[  3.61638215,  11.15102917],
       [ 11.15102917, 135.97653199]])
```

The first element on the diagonal is the variance of the height (which is the exact same value we computed before). The second is the variance of the weight. The values on the outer diagonal are the same, and are the covariance of the height and weight. Notice that it's positive, which is what we would expect; a positive covariance means that both height and weight grow together (ie. as weight increases height also increases).

### Key Takeaways on Covariance
1. Covariance tells you how two random variables grow together
2. Variance is a special case of covariance
3. The covariances for all combinations of random variables in the dataset are represented in the covariance matrix
4. Covariance can be estimated using $S_{XY}$

## Correlation

Often when we're looking at the relationship between two variables we care more about the correlation than the covariance. The idea behind correlation is to *normalize* our covariance; this is a common term in machine learning. Generally, it means to rescale your data to fit in a particular range. For example, a vector can be normalized into a unit vector, which rescales it to a vector of length one. In this context, we normalize our covariance into the range $[-1,1]$ to obtain our correlation. Correlation is defined as: 

$$\rho_{X,Y} = \text{corr}(X,Y) = \frac{\text{cov}(X,Y)}{\sigma_X \sigma_Y} = \frac{\mathbb{E}(X - \mu_X)(Y - \mu_Y)}{\sigma_X \sigma_Y} \in [-1,1]$$

where the denominator normalizes the data. The reason why this normalizes the data might not immediately be obvious. To see this, let's look at the vector form of the unbiased estimator seen above (here $X, Y\in \mathbb{R}^n$ so both are simply vectors):

$$
\rho_{X,Y} = \frac{\text{cov}(X,Y)}{\sigma_X \sigma_Y} = \frac{(X - \bar{X})^T (Y - \bar{Y})}{\sqrt{(X - \bar{X})^T(X - \bar{X})} \cdot \sqrt{(Y - \bar{Y})^T(Y - \bar{Y})}} = \left( \frac{(X - \bar{X})}{\|X - \bar{X}\|} \right)^T \left( \frac{(Y - \bar{Y})}{\|Y - \bar{Y}\|} \right)
$$


Thus, this can be seen as the dot product of two unit vectors. This is exactly the **cosine of the angle** $\theta$ between the two centered data vectors Since $\cos(\theta) \in [-1, 1]$, the correlation is always in that range.

### Why is this useful?

Unlike covariance which can be any real number, correlation gives a standardized way to measure how related two variables are. As such, it gives us a way to compare results across different experiments with data of different scales.

### Example

Using our dataset, we can compute the correlation of our data:

```python
def corr(X, Y):
    centered_x = X - E(X)
    centered_x_norm = np.linalg.norm(centered_x)
    
    centered_y = Y - E(Y)
    centered_y_norm = np.linalg.norm(centered_y)
    
    corr = (centered_x).T @ centered_y / (centered_x_norm * centered_y_norm)
    return corr

corr(heights, weights)  0.50
```

We get a correlation of 0.50, which means height are weight are moderately correlated.

### Key Takeaways on Correlation
1. Correlation is just normalized covariance
2. Correlation provides a way to compare data from different experiments

# A deep dive into the covariance matrix
TODO...

# The Gaussian
TODO...