import { getAllJobsForAdmin } from "../../../lib/jobs";
import { DeleteJobButton } from "../../components/admin/DeleteJobButton";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminJobsPage() {
  const jobs = await getAllJobsForAdmin();

  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <h1>Jobs</h1>
        <a href="/admin/jobs/new" className="btn btn-primary" style={{ borderRadius: 10 }}>
          New Job
        </a>
      </div>

      <div className="admin-card">
        {jobs.length === 0 ? (
          <div className="admin-empty">No jobs yet. Create your first one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="admin-title-cell">{job.title}</td>
                  <td>
                    <span className={`admin-status ${job.published ? "published" : "draft"}`}>
                      {job.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{formatDate(job.created_at)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <a href={`/admin/jobs/${job.id}`}>Edit</a>
                      <a href={`/admin/applications?job_id=${job.id}`}>Applications</a>
                      {job.published && (
                        <a href={`/careers/${job.slug}`} target="_blank" rel="noreferrer">
                          View
                        </a>
                      )}
                      <DeleteJobButton id={job.id} slug={job.slug} title={job.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
