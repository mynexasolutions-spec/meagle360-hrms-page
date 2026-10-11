import { getChatbotLeadsForAdmin } from "../../../lib/chatbot-leads";
import { DeleteChatbotLeadButton } from "../../components/admin/DeleteChatbotLeadButton";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminChatbotLeadsPage() {
  const leads = await getChatbotLeadsForAdmin();

  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <h1>Chatbot Leads</h1>
        <span className="admin-count-badge">
          {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </span>
      </div>

      <div className="admin-card">
        {leads.length === 0 ? (
          <div className="admin-empty">No chatbot leads yet.</div>
        ) : (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Phone</th>
                  <th>Transcript</th>
                  <th>Source Page</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className="admin-title-cell">
                      <a href={`tel:${l.phone}`}>{l.phone}</a>
                    </td>
                    <td style={{ maxWidth: 360 }}>
                      {l.transcript.length === 0 ? (
                        "-"
                      ) : (
                        <details>
                          <summary style={{ cursor: "pointer", color: "var(--primary)" }}>
                            {l.transcript.length} {l.transcript.length === 1 ? "message" : "messages"}
                          </summary>
                          <div style={{ marginTop: 8, whiteSpace: "pre-wrap", fontSize: 13 }}>
                            {l.transcript.map((m, i) => (
                              <p key={i} style={{ margin: "0 0 6px" }}>
                                <strong>{m.role === "user" ? "Visitor" : "Bot"}:</strong> {m.text}
                              </p>
                            ))}
                          </div>
                        </details>
                      )}
                    </td>
                    <td>{l.source || "-"}</td>
                    <td>{formatDate(l.created_at)}</td>
                    <td>
                      <div className="admin-row-actions">
                        <DeleteChatbotLeadButton id={l.id} phone={l.phone} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
