"use client";

import React from "react";
import { navLinks } from "../configs/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isLinkActive = (url: string) => {
    if (pathname === url) {
      return "active";
    }

    return "";
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary p-4"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                className={`nav-link ${isLinkActive(link.url)}`}
                href={link.url}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
