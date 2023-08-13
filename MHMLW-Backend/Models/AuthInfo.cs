namespace MHMLW_Backend.Models;

public record AuthInfo(int userId, string authId, DateTime expireAt);