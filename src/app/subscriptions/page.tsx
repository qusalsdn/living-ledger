import { AppShell } from "@/components/app-shell";
import { AuthenticatedPage } from "@/components/authenticated-page";
import { Subscriptions } from "@/components/subscriptions";

export default function SubscriptionsPage() {
  return <AuthenticatedPage><AppShell><Subscriptions /></AppShell></AuthenticatedPage>;
}
