# Site quick guide

Run commands from the repository root.

## 1. Preview the site with Docker

```sh
docker compose up
```

Open <http://localhost:8080> and check your changes. The source mounted by [docker-compose.yml](docker-compose.yml) is rebuilt as you edit it. Use `docker compose up --build` if you need to rebuild the image, and `docker compose down` when finished. This is a local preview; pushing to `main` triggers the [GitHub Pages deployment](.github/workflows/deploy.yml).

## 2. Change the colour palette

Edit [_sass/_themes.scss](_sass/_themes.scss): `:root` holds the light palette and `html[data-theme="dark"]` holds the dark palette. Change the `--global-*` values for backgrounds, text, links, hover states, and dividers in both blocks, then preview both modes. [_sass/_variables.scss](_sass/_variables.scss) contains reusable Sass colours.

## 3. Change website fonts

Change the Google Fonts URL at `third_party_libraries.google_fonts.url.fonts` in [_config.yml](_config.yml) to load the families and weights you want. Then set the site's `font-family` rules in [_sass/_base.scss](_sass/_base.scss) (for example, `body` and `h1, h2, h3, h4, h5, h6`). The embedded Marimo notebook has its own styles and fonts.

## 4. Publish an interactive Marimo notebook in the blog

1. Export a browser runnable notebook from your Python environment:

   ```sh
   marimo export html-wasm path/to/notebook.py -o assets/marimo/my-notebook --mode run
   ```

   Keep the entire export directory, including `index.html` and `assets/`. Browser execution requires WebAssembly compatible dependencies and an internet connection.

2. Create `_posts/YYYY-MM-DD-my-notebook.md` in [_posts/](_posts/) with a date and a unique folder name. Follow the [decision trees post](_posts/2026-10-18-decision-trees.md) and its [Marimo export](assets/marimo/decision-tree/index.html): add `layout: post`, `title`, `date`, and `description` in the front matter, then embed `{{ '/assets/marimo/my-notebook/index.html' | relative_url }}` as the iframe `src`. Use the same URL for an optional full page link.

3. Preview the blog post with Docker and verify the notebook works inside the iframe. Commit the post and complete export directory, then push to `main` to publish through the site's [deploy workflow](.github/workflows/deploy.yml).

Marimo export syntax: [official WebAssembly HTML guide](https://docs.marimo.io/guides/exporting/webassembly_html/).
