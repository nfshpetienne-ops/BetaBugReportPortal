// ── localStorage ────────────────────────────────────────────────
window.localStorageGet = (key) => localStorage.getItem(key);
window.localStorageSet = (key, value) => localStorage.setItem(key, value);

// ── File download (CSV with UTF-8 BOM, plain blob) ──────────────
window.downloadTextFile = (filename, content, mimeType) => {
    const encoder = new TextEncoder();
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const bytes = encoder.encode(content);
    const combined = new Uint8Array(bom.length + bytes.length);
    combined.set(bom);
    combined.set(bytes, bom.length);
    const blob = new Blob([combined], { type: mimeType });
    _triggerDownload(filename, blob);
};

function _triggerDownload(filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ── PDF export via jsPDF ────────────────────────────────────────
window.exportBugReportPDF = (tickets, reportName, gameVersion, currentUser) => {
    if (typeof window.jspdf === 'undefined') {
        alert('PDF export requires jsPDF. Please check your internet connection and reload.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const PRIORITY_TO_CSV = { Critical: 'P1', High: 'P2', Medium: 'P3', Low: 'P4' };
    const FIXED_STATUSES  = new Set(['Corrected', "Won't Fix"]);

    const title = reportName || `Elastic Slap — Bug Report — v${gameVersion}`;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text(title, 14, 18);

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(120);
    doc.text(
        `Exported: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })} by ${currentUser}  ·  ${tickets.length} ticket(s)`,
        14, 25
    );
    doc.setTextColor(0);

    const unfixed = tickets.filter(t => !FIXED_STATUSES.has(t.status));
    const fixed   = tickets.filter(t =>  FIXED_STATUSES.has(t.status));

    const toRow = t => [
        `#${t.id}`,
        PRIORITY_TO_CSV[t.priority] || t.priority,
        t.severity,
        t.title.length > 55 ? t.title.substring(0, 52) + '\u2026' : t.title,
        t.deviceOs.length > 30 ? t.deviceOs.substring(0, 27) + '\u2026' : t.deviceOs,
        `${t.reproductionLevel}/5`,
        (t.tags || []).join(', ') || '\u2014',
        t.status,
        t.lastComment ? t.lastComment.substring(0, 40) : '\u2014',
    ];

    const head = [['ID', 'Prio', 'Severity', 'Title', 'Device & OS', 'Repro', 'Tags', 'Status', 'Latest Comment']];
    const body = [...unfixed.map(toRow)];

    if (fixed.length) {
        body.push(['\u2500\u2500', 'Corrected', '\u2500\u2500', '\u2500\u2500', '\u2500\u2500', '\u2500\u2500', '\u2500\u2500', '\u2500\u2500', '\u2500\u2500']);
        fixed.forEach(t => body.push(toRow(t)));
    }

    doc.autoTable({
        startY: 30,
        head,
        body,
        headStyles: { fillColor: [29, 36, 128], textColor: 255, fontSize: 8 },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [245, 246, 251] },
        didParseCell(data) {
            if (data.section === 'body' && data.row.raw[0] === '\u2500\u2500')
                data.cell.styles.textColor = [150, 150, 150];
        },
        columnStyles: {
            0: { cellWidth: 12 },
            1: { cellWidth: 12 },
            2: { cellWidth: 18 },
            3: { cellWidth: 55 },
            4: { cellWidth: 38 },
            5: { cellWidth: 12 },
            6: { cellWidth: 32 },
            7: { cellWidth: 25 },
            8: { cellWidth: 'auto' },
        },
    });

    const slug = (reportName || 'bug-report').toLowerCase().replace(/[\s]+/g, '-').replace(/[^a-z0-9-]/g, '');
    doc.save(`${slug}.pdf`);
};

// ── Undo toast animation restart ────────────────────────────────
window.restartUndoAnimation = () => {
    const bar = document.querySelector('.undo-toast-bar');
    if (!bar) return;
    bar.style.animation = 'none';
    void bar.offsetHeight; // trigger reflow
    bar.style.animation = 'shrink 5s linear forwards';
};
