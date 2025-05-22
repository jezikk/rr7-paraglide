import { redirectDocument } from "react-router";
import { baseLocale } from "~/paraglide/runtime";
import { paraglideMiddleware } from "~/paraglide/server";
import type { Route } from "../+types/root";

const localeMiddleware: Route.unstable_MiddlewareFunction = async (
  { request },
  next,
) => {
  const response = await paraglideMiddleware(
    request,
    () => {
      return next();
    },
    {
      onRedirect: (response) => {
        throw response;
      },
    },
  );

  // Remove the base locale from the URL
  if (request.headers.get("Sec-Fetch-Dest") === "document") {
    const url = new URL(request.url);
    const path = url.pathname;
    const pattern = `/${baseLocale}`;

    if (path.startsWith(pattern)) {
      throw redirectDocument(path.substring(pattern.length) || "/", {
        status: 307,
      });
    }
  }

  return response;
};

export { localeMiddleware };
