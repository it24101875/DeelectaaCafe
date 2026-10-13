# Deelectaa Café refresh

The public site now uses the supplied burgundy-and-gold logo, warm ivory backgrounds, and a responsive design. The menu contains 67 items in 15 searchable categories, transcribed from the supplied seven-page PDF. Prices include a clearly stated additional 10% service charge, confirmed by the café owner.

## Changes

- New logo in navigation, footer, and favicon; optimized WebP images.
- New home and story pages; no unsupported founding date or guest-count statistics.
- Text menu with category links, search, empty results, prices, portion sizes, and PDF download.
- Visible mobile navigation, named social links, keyboard focus, skip link, route titles, route scroll reset, and a missing-page screen.
- Real business WhatsApp number and clickable contact details; removed empty policy links.
- Booking request copy accurately distinguishes requests from confirmed bookings.
- Form labels, future-date checks in Sri Lanka time, bounded requests, and inline errors.
- Replaced the video section with a gallery link because the video file is absent from the repository.
- Gallery category selection and visible captions; menu artwork replaces unrelated stock photos.
- Admin authentication for reservation reads/status changes and menu/blog writes; no private token in frontend build.
- Server-side booking validation, safer error responses, and HTML escaping in email content.
- Compatible dependency updates, patched Nodemailer, and Node's built-in development watcher.

## Before production deployment

Set a strong random `ADMIN_TOKEN` in the backend hosting environment. It must remain a server-side secret, never a `VITE_` variable. Staff enter that token on `/admin`; it stays only in component memory and is cleared on sign out. Without a configured token, administrative endpoints fail closed.

Retain `MONGODB_URI`, `EMAIL_USER`, and `EMAIL_PASS` on the backend and `VITE_API_URL=/_/backend/api` on the frontend. Email delivery requires configured production credentials. Existing production data and mail delivery were not exercised with live test bookings.

The printable menu is the original approximately 45 MB PDF, downloaded only when requested. Its optimized previews are small WebP files; the main menu works without downloading the PDF.

## Verification

Frontend: `npm run build`.
Backend: `npm run test` (compiles the backend and checks fail-closed configuration, missing/wrong/correct authentication, protected write routes, and invalid bookings without database writes or emails).
Browser: desktop and 390 px mobile home/menu/bookings/gallery checks, image loading, overflow, search, empty results/reset, category filtering, mobile navigation, and form labels.

The live website remains unchanged until this update is merged and deployed. Configure the server-side admin token before deploying the security changes.
