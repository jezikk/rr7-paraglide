import { redirectDocument } from "react-router";
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

  if (request.headers.get("Sec-Fetch-Dest") === "document") {
    const url = new URL(request.url);
    const params = new URLPattern("/:locale(cs)/:path(.*)?", url.origin).exec(
      url.href,
    );
    const locale = params?.pathname.groups.locale;
    const path = params?.pathname.groups.path;

    if (locale) {
      throw redirectDocument(path ?? "/", { status: 307 });
    }
  }

  return response;
};

export { localeMiddleware };
