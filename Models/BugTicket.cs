namespace BetaBugReportPortal.Models;

public class BugTicket
{
    public int Id { get; set; }
    public int SchemaVersion { get; set; } = 3;
    public int? SourceV1Id { get; set; }
    public string Priority { get; set; } = "Medium";
    public string Severity { get; set; } = "Medium";
    public string DeviceOs { get; set; } = "";
    public int ReproductionLevel { get; set; } = 5;
    public string AffectedVersion { get; set; } = "";
    public string GameId { get; set; } = "elastic-slap";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string StepsToReproduce { get; set; } = "";
    public string MediaUrl { get; set; } = "";
    public string MediaFileName { get; set; } = "";
    public List<string> Tags { get; set; } = [];
    public string Status { get; set; } = "To correct";
    public List<TicketComment> Comments { get; set; } = [];
    public List<EditHistoryEntry> EditHistory { get; set; } = [];
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = "Etienne Bottichio";
}
