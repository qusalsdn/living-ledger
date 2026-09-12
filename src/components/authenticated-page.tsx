"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";

export function AuthenticatedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const supabase = createBrowserClient();
    if (!supabase) { router.replace("/login"); return; }
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      else setReady(true);
    });
  }, [router]);
  if (!ready) return <div className="page-loading">생활 관리판을 불러오는 중이에요.</div>;
  return <>{children}</>;
}
