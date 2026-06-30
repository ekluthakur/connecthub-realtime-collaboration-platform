import { useState } from "react";
import { Menu } from "lucide-react";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b bg-white">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <Logo />

          <DesktopMenu />

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={28} />
            </button>

            <ProfileMenu />

          </div>

        </div>

      </nav>

      <MobileMenu
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}