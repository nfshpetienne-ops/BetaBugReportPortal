namespace BetaBugReportPortal.Models;

public class TicketsStorage
{
    public List<BugTicket> Tickets { get; set; } = [];
    public int NextId { get; set; } = 1;
}
