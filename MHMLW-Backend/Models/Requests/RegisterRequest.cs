namespace MHMLW_Backend.Models.Requests;

public record RegisterRequest(string username, string password, string email, string verifCode)
{
    public string username = username;
    public string password = password;
    public string email = email;
    public string verifCode = verifCode;
}