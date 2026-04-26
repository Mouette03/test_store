Self-hosted file sharing with reverse upload requests, password protection, and expiry links.



Filyo is a lightweight, self-hosted file transfer application with a modern dark glassmorphism UI. Send files to anyone via a shareable link, or create a reverse-share link so others can upload files directly to you — no account required on their end.

**Key features:**
- Multi-file upload with progress bar
- Shareable download links with optional password protection
- Configurable expiry (1h, 24h, 7d, 30d, or never)
- Max download limit per link
- Reverse sharing — generate a link for someone to deposit files to you
- Depositor info — collect name, email and message from senders (configurable: hidden / optional / required)
- Dashboard — manage all sent files and reverse-share requests
- Admin panel — user management, SMTP config, branding, disk usage
- Multi-arch Docker image (amd64 + arm64)

All data is stored locally (SQLite + local filesystem). No S3, no external dependencies.