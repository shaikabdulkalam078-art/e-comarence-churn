// Build a CSV download entirely in the browser from the supplied sample rows.
export function downloadCsv(filename, rows) {
  if (rows.length === 0) return;

  const columns = Object.keys(rows[0]);
  const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const contents = [
    columns.map(escapeCell).join(','),
    ...rows.map((row) => columns.map((column) => escapeCell(row[column])).join(',')),
  ].join('\r\n');
  const file = new Blob([`\uFEFF${contents}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}