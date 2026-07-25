import { createClient } from "../../utils/supabase/server";
import { logout } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin-main">
      <header className="admin-topbar">
        <a href="/" className="brand">
          <img src="/logo.png" alt="Meagle 360 logo" className="brand-mark" />
          Meagle<span>360</span>
        </a>
        {user && (
          <div className="admin-topbar-actions">
            <span>{user.email}</span>
            <a href="/blog" style={{ color: "var(--primary)", fontWeight: 600 }}>
              View blog
            </a>
            <form action={logout}>
              <button type="submit" className="btn btn-outline" style={{ padding: "8px 16px" }}>
                Log out
              </button>
            </form>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
