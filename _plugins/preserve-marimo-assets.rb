# Marimo exports are prebuilt bundles. Rewriting their JavaScript can break the
# app, so keep those files out of the site's Terser pass.
require "jekyll-terser"

module PreserveMarimoAssets
  def generate(site)
    # Jekyll's reader drops files whose basenames start with an underscore.
    # Vite emits some of those files, so add them back as static assets.
    Dir.glob(File.join(site.source, "assets/marimo/**/*/_*.js")).each do |path|
      next if site.static_files.any? { |file| file.path == path }

      dir = File.dirname(path).delete_prefix("#{site.source}/")
      site.static_files << Jekyll::StaticFile.new(site, site.source, dir, File.basename(path))
    end

    marimo_files, other_files = site.static_files.partition do |file|
      file.relative_path.start_with?("/assets/marimo/")
    end

    site.static_files.replace(other_files)
    super
  ensure
    site.static_files.concat(marimo_files) if marimo_files
  end
end

Jekyll::Terser::TerserGenerator.prepend(PreserveMarimoAssets)
