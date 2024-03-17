import { Suspense, lazy } from 'react'
import { Nav } from './components/Nav'

export function App() {
  // Tiny, crappy router
  const importer = {
    '/': () => import('./pages/Home'),
    '/foo': () => import('./pages/Foo'),
    '/bar': () => import('./pages/Bar')
  }[window.location.pathname]

  if (!importer) {
    throw new Error(`No page found for ${window.location.pathname}`)
  }

  const Page = lazy(() => importer())
  return (
    <div>
      <h1>Yes</h1>
      <aside>
        <Nav />
      </aside>
      <Suspense fallback={<div>Loading...</div>}>
        <Page />
      </Suspense>
    </div>
  )
}
