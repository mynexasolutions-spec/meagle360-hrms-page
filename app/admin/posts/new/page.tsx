import { PostForm } from "../../../components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <h1>New post</h1>
        <a href="/admin" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14.5 }}>
          Back to posts
        </a>
      </div>
      <div className="admin-card" style={{ padding: 28 }}>
        <PostForm />
      </div>
    </div>
  );
}
