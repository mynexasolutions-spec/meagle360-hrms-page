import { getContactSubmissionsForAdmin } from "../../../lib/contact";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminLeadsPage() {
  const submissions = await getContactSubmissionsForAdmin();

  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <h1>Leads</h1>
        <span className="admin-count-badge">
          {submissions.length} {submissions.length === 1 ? "submission" : "submissions"}
        </span>
      </div>

      <div className="admin-card">
        {submissions.length === 0 ? (
          <div className="admin-empty">No contact form submissions yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Users</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td className="admin-title-cell">{s.name}</td>
                  <td>
                    <a href={`tel:${s.phone}`}>{s.phone}</a>
                  </td>
                  <td>{s.users || "-"}</td>
                  <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>{s.message || "-"}</td>
                  <td>{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
