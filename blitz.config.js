module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
  env: {
    NEXT_PUBLIC_FATHOM_SITE_ID: "MBVHBUVD",
    NEXT_PUBLIC_BACKGROUND_URL: "https://f000.backblazeb2.com/file/js-talks/bg.jpg",
    NEXT_PUBLIC_FORM_EMBED_IFRAME:
      '<iframe class="airtable-embed" src="https://airtable.com/embed/shrnVkMKyRztuJ3qq?backgroundColor=cyan" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;height: 2050px;"></iframe>',
  },
}
