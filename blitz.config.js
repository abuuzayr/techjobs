const { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/server")

module.exports = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
  env: {
    NEXT_PUBLIC_FATHOM_SITE_ID: process.env.NEXT_PUBLIC_FATHOM_SITE_ID,
    NEXT_PUBLIC_BACKGROUND_URL: process.env.NEXT_PUBLIC_BACKGROUND_URL,
    NEXT_PUBLIC_FORM_EMBED_IFRAME: process.env.NEXT_PUBLIC_FORM_EMBED_IFRAME,
  },
}
