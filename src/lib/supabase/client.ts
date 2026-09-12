import { createBrowserClient as createClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";
export function createBrowserClient() { const config = getSupabaseConfig(); return config ? createClient(config.url, config.anonKey) : null; }
