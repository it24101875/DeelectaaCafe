import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "node:crypto";
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected)
    return res.status(503).json({ message: "Admin access is not configured." });
  const supplied = req.headers.authorization?.replace(/^Bearer /, "") || "";
  const a = Buffer.from(supplied),
    b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b))
    return res.status(401).json({ message: "Admin authentication required." });
  next();
}
