// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Materials for courses I&#39;ve taught",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-an-introduction-to-asymmetric-cryptography-through-rsa",
        
          title: "An introduction to asymmetric cryptography through RSA",
        
        description: "An introduction to the idea of the RSA cryptosystem. RSA is an example of asymmetric encryption; this concept is critical to understand SSH, digital signatures, and the blockchain.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/rsa/";
          
        },
      },{id: "post-stats-and-probability-theory-i-wished-i-learned-before-ml",
        
          title: "Stats and probability theory I wished I learned before ML",
        
        description: "Covering important aspects of statistics and probability that are frequently glossed over in ML teaching.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/covariance/";
          
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%69%6B%61%65%6C.%67%61%67%6E%6F%6E@%6D%61%69%6C.%6D%63%67%69%6C%6C.%63%61", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jikael-gagnon", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
