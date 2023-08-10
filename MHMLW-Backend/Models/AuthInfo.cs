namespace MHMLW_Backend.Models;

public record AuthInfo(string authId, DateTime expireAt)
{
    public string authId = authId;
    public DateTime expireAt = expireAt;
}