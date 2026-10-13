import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import reservations from "../dist/routes/reservations.js";
import menu from "../dist/routes/menu.js";
import blog from "../dist/routes/blog.js";
import { requireAdmin } from "../dist/middleware/admin.js";
const app = express();
app.use(express.json());
app.use("/reservations", reservations);
app.use("/menu", menu);
app.use("/blog", blog);
app.get("/protected", requireAdmin, (_req, res) => res.json({ ok: true }));
const server = app.listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const base = "http://127.0.0.1:" + server.address().port;
const original = process.env.ADMIN_TOKEN;
test.after(() => {
  if (original === undefined) delete process.env.ADMIN_TOKEN;
  else process.env.ADMIN_TOKEN = original;
  server.close();
});
test("admin routes fail closed when no token is configured", async () => {
  delete process.env.ADMIN_TOKEN;
  const r = await fetch(base + "/reservations");
  assert.equal(r.status, 503);
});
test("reservation data and all write routes reject missing authentication", async () => {
  process.env.ADMIN_TOKEN = "test-token-local-only";
  for (const [path, method] of [
    ["/reservations", "GET"],
    ["/reservations/123/status", "PATCH"],
    ["/menu", "POST"],
    ["/blog", "POST"],
  ]) {
    const r = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(method === "GET" ? {} : { body: "{}" }),
    });
    assert.equal(r.status, 401);
  }
});
test("wrong tokens are rejected and correct tokens reach protected handlers", async () => {
  let r = await fetch(base + "/protected", {
    headers: { Authorization: "Bearer wrong" },
  });
  assert.equal(r.status, 401);
  r = await fetch(base + "/protected", {
    headers: { Authorization: "Bearer test-token-local-only" },
  });
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
});
test("invalid or past bookings are rejected before accessing the database", async () => {
  const data = {
    name: "Test Guest",
    email: "guest@example.com",
    phone: "+94763961078",
    date: "2000-01-01",
    time: "10:00",
    guests: 2,
  };
  for (const value of [
    data,
    { ...data, date: "2099-01-01", guests: 13 },
    { ...data, date: "2099-01-01", time: "22:00" },
    { ...data, date: "2099-01-01", email: "invalid" },
  ]) {
    const r = await fetch(base + "/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    assert.equal(r.status, 400);
  }
});
