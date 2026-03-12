'use client'
import { useState, use } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function RoleLayout({ children, params }) {
  const { role } = use(params);
  const [collapsed, setCollapsed] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        showMobile={showMobile}
        setShowMobile={setShowMobile}
      />
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        <Header
          role={role}
          setShowMobile={setShowMobile}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}