import { FC } from "react";
import { FaBookOpen } from "react-icons/fa";
import { CONTACT_INFO, NAVBAR_ITEMS } from "../LandingPageLayout.constant";
import Link from "next/link";

const LandingPageLayoutFooter: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-linear-to-r from-sky-900 to-sky-700 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <FaBookOpen className="h-6 w-6 text-white" />
              <span>Perpustakaan SMKN 6</span>
            </div>
            <p className="text-white/80">
              Meningkatkan literasi dan menyediakan akses informasi yang luas
              untuk seluruh warga sekolah.
            </p>
          </div>

          {/* Quick Links */}
          <nav>
            <h3 className="mb-4 font-semibold">Navigasi</h3>
            <ul className="space-y-2 text-white/80">
              {NAVBAR_ITEMS.map((item) => (
                <li key={`nav-footer-${item.label}`}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Informasi Kontak</h3>
            <ul className="space-y-3 text-white/80">
              {CONTACT_INFO.map((item) => (
                <li key={item.key} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-white" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          <p>
            &copy; {currentYear} Perpustakaan SMKN 6 Kota Tangerang Selatan. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageLayoutFooter;
