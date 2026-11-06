import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground() {
  return (
   <div className="raspberry-grid relative flex min-h-screen w-full items-center justify-center overflow-hidden">
  <div className="pointer-events-none absolute inset-0 bg-[#E60067] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
  <p className="relative z-20">Backgrounds</p>
</div>
  );
}
