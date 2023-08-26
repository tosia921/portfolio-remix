// import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "~/tailwind.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { lazy, Suspense } from "react";
import { getSession } from "~/sessions";

// export const links = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];

const PreviewProvider = lazy(() => import("~/components/PreviewProvider"));

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("preview");
  const preview = token ? { token } : undefined;

  return { preview };
};

export default function App() {

  const { preview } = useLoaderData();
  const children = <Outlet />

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      {preview?.token ? (
          <PreviewProvider token={preview.token}>
            <Suspense fallback={children}>
              {children}
            </Suspense>
          </PreviewProvider>
        ) : (
          children
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
