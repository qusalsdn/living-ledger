import { AppShell } from "@/components/app-shell";
import { AuthenticatedPage } from "@/components/authenticated-page";
import { Reports } from "@/components/reports";

export default function ReportsPage() {
  return <AuthenticatedPage><AppShell><Reports /></AppShell></AuthenticatedPage>;
}
