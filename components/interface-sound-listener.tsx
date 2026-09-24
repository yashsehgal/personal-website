"use client";

import { startInterfaceSounds } from "@/lib/interface-sounds";
import { useEffect } from "react";

export function InterfaceSoundListener() {
  useEffect(() => startInterfaceSounds(), []);

  return null;
}
