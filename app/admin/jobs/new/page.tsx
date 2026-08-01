import { JobForm } from "../../../components/admin/JobForm";

export default function NewJobPage() {
  return (
    <div className="admin-container" style={{ maxWidth: 800 }}>
      <div className="admin-header-row" style={{ marginBottom: 24 }}>
        <h1>Create new job</h1>
      </div>
      <div className="admin-card" style={{ padding: "32px" }}>
        <JobForm />
      </div>
    </div>
  );
}
