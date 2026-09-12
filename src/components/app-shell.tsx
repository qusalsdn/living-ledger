"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarRange, LayoutDashboard, LogOut, ReceiptText } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

const navigation = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/costs", label: "고정비", icon: ReceiptText },
  { href: "/contracts", label: "계약 일정", icon: CalendarRange },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  async function signOut() {
    const supabase = createBrowserClient();
    if (supabase) await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }
  return <div className="app-frame"><aside className="sidebar"><Link href="/dashboard" className="brand"><span className="brand-mark">ㅅ</span><span>혼자살림</span></Link><nav>{navigation.map(({ href, label, icon: Icon }) => <Link className={pathname === href ? "side-link active" : "side-link"} href={href} key={href}><Icon size={18} />{label}</Link>)}</nav><button className="signout-button" onClick={signOut}><LogOut size={17} />로그아웃</button></aside><main className="app-main">{children}</main></div>;
}
