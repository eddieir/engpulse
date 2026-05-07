import { redirect } from "next/navigation";

export default function LaunchKitRedirect() {
  redirect("/internal/launch-kit");
}
