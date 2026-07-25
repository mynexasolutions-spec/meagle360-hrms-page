"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "../../admin/actions";

export function DeletePostButton({
  id,
  slug,
  title,
  redirectTo,
}: {
  id: string;
  slug: string;
  title: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setError("");
    startTransition(async () => {
      const res = await deletePost(id, slug);
      if (res.error) {
        setError(res.error);
        return;
      }
      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      }
    });
  }

  return (
    <>
      <button type="button" className="danger" onClick={handleDelete} disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </button>
      {error && <span style={{ color: "#ef4444", fontSize: 12.5 }}>{error}</span>}
    </>
  );
}
