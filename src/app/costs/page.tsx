import { AppShell } from "@/components/app-shell";
import { AuthenticatedPage } from "@/components/authenticated-page";
import { FixedCosts } from "@/components/fixed-costs";
export default function CostsPage() { return <AuthenticatedPage><AppShell><FixedCosts /></AppShell></AuthenticatedPage>; }
