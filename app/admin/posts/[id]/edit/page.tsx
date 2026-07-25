import { notFound } from "next/navigation";
import { getPostByIdForAdmin } from "../../../../../lib/posts";
import { PostForm } from "../../../../components/admin/PostForm";
import { DeletePostButton } from "../../../../components/admin/DeletePostButton";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <h1>Edit post</h1>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="/admin" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14.5 }}>
            Back to posts
          </a>
          <DeletePostButton id={post.id} slug={post.slug} title={post.title} redirectTo="/admin" />
        </div>
      </div>
      <div className="admin-card" style={{ padding: 28 }}>
        <PostForm post={post} />
      </div>
    </div>
  );
}
