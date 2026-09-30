export function NotFoundPage({ pathname }: { pathname: string }) {
  return (
    <main className="system-page">
      <span className="eyebrow">Screen not found</span>
      <h1>This isn't a Feelio screen.</h1>
      <p>
        <code>{pathname}</code> doesn't match one of the prototype routes.
      </p>
      <a className="text-link" href="/">
        Return to setup
      </a>
    </main>
  );
}
