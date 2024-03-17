import express from 'express'
import viteDevServer from 'vavite/vite-dev-server'

export const DEFAULT_CLIENT_ENTRY = 'src/client/main.tsx'
export const DEFAULT_SERVER_ENTRY = 'src/server/main.ts'

const anyRouter = express.Router()

// Home page route.
anyRouter.get('*', async (req, res) => {
  let clientEntryPath: string
  let css: string[] = []
  if (viteDevServer) {
    // In development, we can simply refer to the source file name
    clientEntryPath = DEFAULT_CLIENT_ENTRY
  } else {
    // In production we'll figure out the path to the client entry file using the manifest
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: This only exists after the client build is complete
    const manifest = (await import('../../../dist/client/.vite/manifest.json')).default
    clientEntryPath = manifest[DEFAULT_CLIENT_ENTRY].file
    css = [...css, ...manifest[DEFAULT_CLIENT_ENTRY].css]
    // In a real application we would also use the manifest to generate
    // preload links for assets needed for the rendered page
  }

  let html = `<!DOCTYPE html><html lang="en">
		<head>
			<meta charset="UTF-8">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

			<title>SSR React Express</title>
      ${css.map((href) => `<link rel="stylesheet" href="${href}">`)}
		</head>
		<body>
			<div id="root"></div>
			<script type="module" src="${clientEntryPath}"></script>
		</body>
	</html>`

  if (viteDevServer) {
    // This will inject the Vite client and React fast refresh in development
    html = await viteDevServer.transformIndexHtml(req.url, html)
  }

  res.send(html)
})

export default anyRouter
