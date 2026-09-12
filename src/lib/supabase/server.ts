import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";
export async function createServerClient() { const config = getSupabaseConfig(); if (!config) return null; const cookieStore = await cookies(); return createClient(config.url, config.anonKey, { cookies: { getAll() { return cookieStore.getAll(); }, setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch { /* Server Component cookie writes are ignored. */ } } } }); }
