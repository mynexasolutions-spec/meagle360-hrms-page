import { notFound } from "next/navigation";
import { getJobByIdForAdmin } from "../../../../lib/jobs";
import { JobForm } from "../../../components/admin/JobForm";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const job = await getJobByIdForAdmin(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="admin-container" style={{ maxWidth: 800 }}>
      <div className="admin-header-row" style={{ marginBottom: 24 }}>
        <h1>Edit job</h1>
      </div>
      <div className="admin-card" style={{ padding: "32px" }}>
        <JobForm job={job} />
      </div>
    </div>
  );
}
