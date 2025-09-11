import { Icons } from "@/components/Icons/Icons";
import React from "react";

export const getIcon = (name: string) => {
  const key = name.replace(/\s+/g, "");

  return (
    (Icons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[key] ||
    Icons.Dashboard
  );
};
