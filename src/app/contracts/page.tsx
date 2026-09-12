import { AppShell } from "@/components/app-shell";
import { AuthenticatedPage } from "@/components/authenticated-page";
import { Contracts } from "@/components/contracts";
export default function ContractsPage() { return <AuthenticatedPage><AppShell><Contracts /></AppShell></AuthenticatedPage>; }
