import { paraglideMiddleware } from "~/paraglide/server";
import type { Route } from "../+types/root";

const localeMiddleware: Route.unstable_MiddlewareFunction = async (
  { request },
  next,
) => {
  return await paraglideMiddleware(
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
};

export { localeMiddleware };
