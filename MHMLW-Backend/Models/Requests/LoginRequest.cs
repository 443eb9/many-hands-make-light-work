namespace MHMLW_Backend.Models.Requests;

public record LoginRequest(string username, string password)
{
    public string username = username;
    public string password = password;
}