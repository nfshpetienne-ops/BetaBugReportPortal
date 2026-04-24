namespace BetaBugReportPortal.Models;

public class TicketFormModel
{
    public string Priority { get; set; } = "Medium";
    public string Severity { get; set; } = "Medium";
    public string AffectedVersion { get; set; } = "";
    public string DeviceOs { get; set; } = "";
    public int ReproductionLevel { get; set; } = 5;
    public List<string> Tags { get; set; } = [];
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string StepsToReproduce { get; set; } = "";
    public string Status { get; set; } = "To correct";
    public string MediaUrl { get; set; } = "";
    public string MediaFileName { get; set; } = "";
    public string NewComment { get; set; } = "";
}
