namespace MHMLW_Backend.Models.Requests.User;

public record RegisterRequest(string username, string password, string email, string verifCode, int province);