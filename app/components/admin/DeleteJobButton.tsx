"use client";

import { useTransition } from "react";
import { deleteJob } from "../../admin/jobs/actions";

export function DeleteJobButton({ id, slug, title }: { id: string; slug: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      startTransition(async () => {
        const res = await deleteJob(id, slug);
        if (res.error) alert(res.error);
      });
    }
  }

  return (
    <button
      type="button"
      className="btn btn-outline"
      style={{
        padding: "4px 8px",
        fontSize: "12px",
        borderColor: "var(--border)",
        color: "#ef4444",
      }}
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
