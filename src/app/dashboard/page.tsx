import { AppShell } from "@/components/app-shell";
import { AuthenticatedPage } from "@/components/authenticated-page";
import { Dashboard } from "@/components/dashboard";
export default function DashboardPage() { return <AuthenticatedPage><AppShell><Dashboard /></AppShell></AuthenticatedPage>; }
