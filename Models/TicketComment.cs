namespace BetaBugReportPortal.Models;

public class TicketComment
{
    public int Id { get; set; }
    public string Text { get; set; } = "";
    public string Author { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
