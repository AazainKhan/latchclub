"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useWaitlistForm() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Implement API call
    setStatus("loading");
  }

  return { email, setEmail, city, setCity, status, handleSubmit };
}
