"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { COST_CATEGORIES, FREQUENCIES, formatWon, type FixedCost } from "@/lib/living-data";
import { createBrowserClient } from "@/lib/supabase/client";

type CostInput = Omit<FixedCost, "id" | "created_at">;
const emptyCost: CostInput = { name: "", amount: 0, frequency: "매월", payment_day: 1, category: "주거", is_autopay: true };

export function FixedCosts() {
  const [costs, setCosts] = useState<FixedCost[]>([]);
  const [form, setForm] = useState<CostInput>(emptyCost);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const load = async () => {
    const supabase = createBrowserClient();
    if (!supabase) return;
    const { data, error } = await supabase.from("fixed_costs").select("*").order("payment_day").order("created_at");
    if (error) setMessage("데이터를 불러오지 못했어요. 데이터베이스 설정을 확인해 주세요.");
    else setCosts((data ?? []) as FixedCost[]);
    setLoading(false);
  };
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, []);
  function openCreate() { setForm(emptyCost); setEditingId(null); setMessage(""); setOpen(true); }
  function openEdit(cost: FixedCost) { setForm({ name: cost.name, amount: cost.amount, frequency: cost.frequency, payment_day: cost.payment_day, category: cost.category, is_autopay: cost.is_autopay }); setEditingId(cost.id); setMessage(""); setOpen(true); }
  async function save(event: FormEvent) {
    event.preventDefault(); setMessage("");
    if (!Number.isInteger(form.amount) || form.amount < 1) { setMessage("금액은 1원 이상의 정수로 입력해 주세요."); return; }
    const supabase = createBrowserClient(); if (!supabase) return;
    const payload = { ...form, name: form.name.trim() };
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { setMessage("로그인 정보를 확인할 수 없어요. 다시 로그인해 주세요."); return; }
    const result = editingId
      ? await supabase.from("fixed_costs").update(payload).eq("id", editingId)
      : await supabase.from("fixed_costs").insert({ ...payload, user_id: auth.user.id });
    if (result.error) { setMessage(result.error.message); return; }
    setOpen(false); await load();
  }
  async function remove(id: string) {
    if (!window.confirm("이 고정비를 삭제할까요?")) return;
    const supabase = createBrowserClient(); if (!supabase) return;
    const { error } = await supabase.from("fixed_costs").delete().eq("id", id);
    if (error) setMessage(error.message); else load();
  }
  return <section><header className="page-header"><div><p className="eyebrow">고정비 관리</p><h1>매달 나가는 돈을 정리하세요.</h1><p>결제일과 자동결제 여부까지 함께 관리할 수 있어요.</p></div><button className="primary-button" onClick={openCreate}><Plus size={18} />고정비 추가</button></header>{message && !open && <p className="inline-message">{message}</p>}<section className="content-card"><div className="table-heading"><span>총 {costs.length}건</span><span>금액은 월 기준으로 표시됩니다</span></div>{loading ? <p className="empty-state">불러오는 중이에요.</p> : costs.length === 0 ? <Empty title="아직 등록한 고정비가 없어요." description="월세, 통신비처럼 매달 반복되는 비용부터 추가해 보세요." action={openCreate} /> : <div className="data-table"><div className="table-row table-head"><span>항목</span><span>카테고리</span><span>결제일</span><span>자동결제</span><span>금액</span><span /></div>{costs.map((cost) => <div className="table-row" key={cost.id}><strong>{cost.name}<small>{cost.frequency}</small></strong><span><i className={`category-dot category-${cost.category}`} />{cost.category}</span><span>매월 {cost.payment_day}일</span><span>{cost.is_autopay ? "자동결제" : "직접 결제"}</span><b>{formatWon(cost.frequency === "매년" ? Math.round(cost.amount / 12) : cost.amount)}</b><span className="row-actions"><button aria-label={`${cost.name} 수정`} onClick={() => openEdit(cost)}><Pencil size={16} /></button><button aria-label={`${cost.name} 삭제`} onClick={() => remove(cost.id)}><Trash2 size={16} /></button></span></div>)}</div>}</section>{open && <CostModal form={form} setForm={setForm} editing={Boolean(editingId)} onClose={() => setOpen(false)} onSave={save} message={message} />}</section>;
}

function CostModal({ form, setForm, editing, onClose, onSave, message }: { form: CostInput; setForm: React.Dispatch<React.SetStateAction<CostInput>>; editing: boolean; onClose: () => void; onSave: (event: FormEvent) => void; message: string }) {
  const field = <K extends keyof CostInput>(key: K, value: CostInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  return <div className="modal-backdrop" role="presentation"><form className="modal" onSubmit={onSave}><header><div><p className="eyebrow">{editing ? "고정비 수정" : "새 고정비"}</p><h2>{editing ? "고정비 정보를 수정하세요." : "반복 비용을 추가하세요."}</h2></div><button type="button" className="icon-button" onClick={onClose}><X /></button></header><div className="form-grid"><label>이름<input value={form.name} onChange={(e) => field("name", e.target.value)} placeholder="예: 월세" required maxLength={80} /></label><label>금액 (원)<input type="number" min="1" step="1" value={form.amount || ""} onChange={(e) => field("amount", Number(e.target.value))} placeholder="0" required /></label><label>주기<select value={form.frequency} onChange={(e) => field("frequency", e.target.value as CostInput["frequency"])}>{FREQUENCIES.map((value) => <option key={value}>{value}</option>)}</select></label><label>결제일<select value={form.payment_day} onChange={(e) => field("payment_day", Number(e.target.value))}>{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => <option value={day} key={day}>{day}일</option>)}</select></label><label>카테고리<select value={form.category} onChange={(e) => field("category", e.target.value as CostInput["category"])}>{COST_CATEGORIES.map((value) => <option key={value}>{value}</option>)}</select></label><label className="check-field"><input type="checkbox" checked={form.is_autopay} onChange={(e) => field("is_autopay", e.target.checked)} />자동결제 항목이에요</label></div>{message && <p className="form-error">{message}</p>}<footer><button type="button" className="secondary-button" onClick={onClose}>취소</button><button className="primary-button" type="submit">{editing ? "저장하기" : "추가하기"}</button></footer></form></div>;
}

export function Empty({ title, description, action }: { title: string; description: string; action?: () => void }) { return <div className="empty-state"><strong>{title}</strong><p>{description}</p>{action && <button className="secondary-button" onClick={action}>추가하기</button>}</div>; }
