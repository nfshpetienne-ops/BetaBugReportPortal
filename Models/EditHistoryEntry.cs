namespace BetaBugReportPortal.Models;

public class EditHistoryEntry
{
    public string Field { get; set; } = "";
    public string OldValue { get; set; } = "";
    public string NewValue { get; set; } = "";
    public string ChangedBy { get; set; } = "";
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
}
