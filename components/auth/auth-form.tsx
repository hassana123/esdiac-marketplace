"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, signup } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    try {
      await (mode === "signup" ? signup(payload) : login(payload));
      router.push("/home");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-3xl font-semibold text-white">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p className="text-sm text-brand-muted">
          {mode === "signup"
            ? "Start selling, discovering, and connecting in minutes."
            : "Sign in to continue your marketplace journey."}
        </p>
      </div>
      {mode === "signup" ? <Input name="name" label="Full name" /> : null}
      <Input name="email" label="Email address" type="email" />
      <Input name="password" label="Password" type="password" />
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <Button className="w-full" disabled={loading}>
        {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
      </Button>
      {mode === "login" ? (
        <Link className="block text-center text-sm text-brand-accent" href="/signup">
          Need an account? Sign up
        </Link>
      ) : null}
    </form>
  );
}

type InputProps = {
  label: string;
  name: string;
  type?: string;
};

function Input({ label, name, type = "text" }: InputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/82">{label}</span>
      <input
        required
        className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-brand-accent"
        name={name}
        type={type}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </label>
  );
}
