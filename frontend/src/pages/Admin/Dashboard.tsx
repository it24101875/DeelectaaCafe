import { useState } from "react";
import axios from "axios";
interface Reservation {
  _id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: string;
}
export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<Reservation[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const api = import.meta.env.VITE_API_URL || "/_/backend/api";
  const config = {
    headers: { Authorization: "Bearer " + token },
    timeout: 15000,
  };
  async function load() {
    setBusy(true);
    setError("");
    try {
      const r = await axios.get(api + "/reservations", config);
      setRows(r.data);
      setAuthenticated(true);
    } catch {
      setError(
        "Access failed. Check your admin token and server configuration.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function update(id: string, status: string) {
    setBusy(true);
    setError("");
    try {
      await axios.patch(
        api + "/reservations/" + id + "/status",
        { status },
        config,
      );
      setRows((old) => old.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch {
      setError("The status could not be updated. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="shell section">
      <h1 className="text-4xl">Reservations administration</h1>
      <p role="alert" className="text-primary my-6">
        {error}
      </p>
      {!authenticated ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void load();
          }}
        >
          <label htmlFor="admin-token">Admin access token</label>
          <input
            id="admin-token"
            type="password"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="block border p-3 my-4 w-full"
            autoComplete="off"
          />
          <button className="button" disabled={busy}>
            {busy ? "Checking…" : "Sign in"}
          </button>
        </form>
      ) : (
        <>
          <div className="actions">
            <button
              className="button"
              disabled={busy}
              onClick={() => void load()}
            >
              Refresh
            </button>
            <button
              className="button secondary"
              onClick={() => {
                setToken("");
                setRows([]);
                setAuthenticated(false);
              }}
            >
              Sign out
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  {["Guest", "Date / time", "Guests", "Status", "Actions"].map(
                    (h) => (
                      <th className="p-4" key={h}>
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r._id}>
                    <td className="p-4">{r.name}</td>
                    <td className="p-4">
                      {new Date(r.date).toLocaleDateString("en-GB", {
                        timeZone: "Asia/Colombo",
                      })}{" "}
                      · {r.time}
                    </td>
                    <td className="p-4">{r.guests}</td>
                    <td className="p-4">{r.status}</td>
                    <td className="p-4">
                      {r.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            className="button"
                            disabled={busy}
                            onClick={() => void update(r._id, "confirmed")}
                          >
                            Approve
                          </button>
                          <button
                            className="button secondary"
                            disabled={busy}
                            onClick={() => void update(r._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length && <p>No reservations found.</p>}
          </div>
        </>
      )}
    </div>
  );
}
