'use client'
import { faBuilding, faUser, faHome, faChartBar, faIdCard, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faGears, faBars, faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { use, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ role, collapsed, setCollapsed, showMobile, setShowMobile }) {
  const pathname = usePathname();
  if (!role) return null;

  const basePath = `/${role}`;

  const links = [
    { href: `${basePath}/dashboard`, icon: faHome, label: 'Dashboard', roles: ['admin', 'agent'] },
    { href: `${basePath}/properties`, icon: faBuilding, label: 'Properties', roles: ['admin', 'agent'] },
    { href: `${basePath}/add-property`, icon: faPlus, label: 'Add Property', roles: ['admin', 'agent'] },
    { href: `${basePath}/agents`, icon: faUser, label: 'Agents', roles: ['admin'] },
    { href: `${basePath}/profile`, icon: faIdCard, label: 'Profile', roles: ['admin', 'agent'] },
    { href: `${basePath}/settings`, icon: faGears, label: 'Settings', roles: ['admin'] },
  ];

  const filteredLinks = links.filter(link => link.roles.includes(role));

  return (
    <>
      {showMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setShowMobile(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 lg:sticky lg:top-0 flex flex-col bg-[#0f172a] text-white h-screen transition-all duration-300 z-50
          ${showMobile ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-16' : 'lg:w-64'}
          shrink-0 shadow-2xl lg:shadow-none`}
      >
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'lg:justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-base font-dm-serif-display">S</span>
          </div>
          <div className={`${collapsed ? 'lg:hidden' : 'block'}`}>
            <p className="text-sm font-semibold font-work-sans text-white leading-none">Soleil d&apos;Espagne</p>
            <p className="text-xs text-white/50 capitalize mt-0.5">{role} panel</p>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : ''}
                onClick={() => setShowMobile(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-work-sans
                  ${isActive
                    ? 'bg-gold text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }
                  ${collapsed ? 'lg:justify-center' : ''}
                `}
              >
                <FontAwesomeIcon className="h-4 w-4 shrink-0" icon={link.icon} />
                <span className={`${collapsed ? 'lg:hidden' : 'block'}`}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pb-4 border-t border-white/10 pt-4">
          <Link
            href="/auth/login"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-work-sans text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'lg:justify-center' : ''}`}
            title={collapsed ? 'Logout' : ''}
          >
            <FontAwesomeIcon className="h-4 w-4 shrink-0" icon={faArrowRightFromBracket} />
            <span className={`${collapsed ? 'lg:hidden' : 'block'}`}>Logout</span>
          </Link>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-6 bg-[#0f172a] border border-white/10 text-white/60 hover:text-white rounded-full w-6 h-6 items-center justify-center shadow-md z-50 transition-colors"
        >
          <FontAwesomeIcon className="h-3 w-3" icon={collapsed ? faBars : faChevronLeft} />
        </button>
      </aside>
    </>
  );
}
