"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function AuthForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!configured) return;
    setLoading(true); setMessage("");
    const supabase = createBrowserClient(); if (!supabase) return;
    const result = mode === "login" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    setLoading(false);
    if (result.error) { setMessage(result.error.message); return; }
    setMessage(mode === "login" ? "로그인되었습니다. 잠시 후 이동합니다." : "인증 메일을 보냈어요. 메일함을 확인해 주세요.");
    if (mode === "login") router.push("/dashboard");
  }
  return <><div className="auth-tabs" role="tablist"><button type="button" className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setMessage(""); }}>로그인</button><button type="button" className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>회원가입</button></div>{!configured ? <div className="config-notice"><strong>Supabase 연결이 필요해요</strong><p><code>.env.local</code>에 URL과 익명 키를 넣으면 이메일 인증을 사용할 수 있습니다.</p></div> : <form className="auth-form" onSubmit={handleSubmit}><label>이메일<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required /></label><label>비밀번호<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="8자 이상 입력" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required /></label><button className="primary-button full-width" type="submit" disabled={loading}>{loading && <LoaderCircle className="spinner" size={17} />} {mode === "login" ? "로그인" : "회원가입"}</button>{message && <p className="form-message" role="status">{message}</p>}</form>}</>;
}
