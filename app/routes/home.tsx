import { localizeUrl } from "~/paraglide/runtime";
import { Welcome } from "../components/welcome/welcome";
import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = localizeUrl(request.url);

  return { pathname: url.pathname };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { pathname } = loaderData;
  return <Welcome pathname={pathname} />;
}
