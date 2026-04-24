# BetaBugReportPortal — V3 (Blazor Server)

Bug reporting portal for **Elastic Slap** (Ketchapp Internal) — ported from V2 (HTML/JS) to **ASP.NET Core 8 Blazor Server**.

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

---

## Run locally

```bash
git clone https://github.com/nfshpetienne-ops/BetaBugReportPortal.git
cd BetaBugReportPortal
dotnet run
```

Then open `http://localhost:5095` in your browser.

---

## Features (identical to V2)

| Feature | Detail |
|---|---|
| **Ticket CRUD** | Create, read, update, delete bug tickets |
| **Priority / Severity** | Critical / High / Medium / Low (independent fields) |
| **Reproduction Level** | Numeric 1/5 – 5/5 scale |
| **Tags** | UI, In-App Purchase, System, Gameplay, Mayo |
| **Status** | To correct / In Progress / Standby / Duplicate / Won't Fix / Corrected |
| **Sort** | Active tickets first (by priority), fixed tickets last |
| **Filters** | Status, Severity, Tag, full-text search |
| **Detail Drawer** | Slide-in panel with all fields, comments, edit history |
| **Delete + Undo** | 5-second undo toast (no blocking confirm dialog) |
| **Select mode** | Check rows for batch export |
| **CSV Export** | 10-column strict template with UTF-8 BOM (Excel-compatible) |
| **PDF Export** | Landscape A4 via jsPDF |
| **Report Modal** | Select tickets → name + version → CSV or PDF |
| **V2 Migration** | Reads existing `bugReports_v2` localStorage data on first load |
| **localStorage** | Persists across sessions via browser storage (JS interop) |

---

## Architecture

```
BetaBugReportPortal/
├── Program.cs                        .NET 8 entry point
├── App.razor                         HTML root + CDN links
├── Models/
│   ├── BugTicket.cs                  Data model (schema v3)
│   ├── TicketComment.cs
│   ├── EditHistoryEntry.cs
│   ├── TicketFormModel.cs            Form binding model
│   └── TicketsStorage.cs             JSON serialization wrapper
├── Services/
│   └── LocalStorageService.cs        IJSRuntime wrapper
├── wwwroot/
│   ├── css/app.css                   Portal styles
│   └── js/interop.js                 localStorage, download, jsPDF interop
└── Components/
    ├── Layout/MainLayout.razor
    └── Pages/
        ├── Home.razor                Sidebar + revision header + tabs
        └── BugReports/
            ├── BugReportsTab.razor   Main component (state + table + CRUD)
            ├── TicketModal.razor     Create / Edit form modal
            ├── DetailDrawer.razor    Right-side detail panel
            ├── ReportModal.razor     Report generation modal
            └── UndoToast.razor       Delete undo notification
```

---

## localStorage keys

| Key | Content |
|---|---|
| `bugReports_v3` | Tickets array + nextId (V3 schema) |
| `bugReports_v2` | Legacy V2 data (read-once for migration) |
| `bugReports_v3_migrated` | Migration flag |
