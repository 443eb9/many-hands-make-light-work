namespace MHMLW_Backend.Models.Requests.User;

public record RetrieveRequest(string email, string verifCode, string newPassword);