namespace MHMLW_Backend.Models.Responses.User;

public record LoginResponse(string message, AuthInfo? authInfo = null);