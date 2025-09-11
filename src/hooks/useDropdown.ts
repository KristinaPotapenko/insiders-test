import React, { useEffect, useState } from "react";

export const useDropdown = (
  navRef: React.RefObject<HTMLElement> | null = null
) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef?.current && !navRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return { dropdownOpen, setDropdownOpen };
};
