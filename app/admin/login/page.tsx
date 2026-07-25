"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <a href="/" className="brand">
          <img src="/logo.png" alt="Meagle 360 logo" className="brand-mark" />
          Meagle<span>360</span>
        </a>
        <h1>Admin sign in</h1>
        <p className="sub">Manage blog posts for Meagle 360.</p>

        <form className="admin-form" onSubmit={handleSubmit}>
          {error && <div className="admin-error">{error}</div>}
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
