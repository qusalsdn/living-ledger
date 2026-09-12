import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "혼자살림 | 1인 가구 생활 관리",
  description: "고정비와 생활 계약을 한 화면에서 관리하세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
