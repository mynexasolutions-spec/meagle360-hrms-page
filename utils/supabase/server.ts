import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

// Cached per-request: without this, every Server Component / Server Action
// that calls createClient() independently re-reads the session and can each
// trigger their own token refresh. Supabase rotates refresh tokens on use,
// so two concurrent refreshes in the same request race — the second one
// fails (token already rotated) and clears the session. Caching ensures
// only one client/getUser() call happens per request.
export const createClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from a Server Component; ignore since middleware
            // refreshes the session on every request.
          }
        },
      },
    },
  );
});
