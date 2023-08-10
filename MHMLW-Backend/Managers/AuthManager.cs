using System.Text;
using MHMLW_Backend.Models;
using MHMLW_Backend.Utils;

namespace MHMLW_Backend.Managers;

public static class AuthManager
{
    private static Random _random = new(DateTime.UtcNow.Millisecond);
    private static Dictionary<string, AuthInfo> _authInfos = new();

    public static bool CheckUserAuth(string userId, AuthInfo info)
    {
        if (!_authInfos.ContainsKey(userId))
            return false;

        if (info.expireAt > DateTime.UtcNow)
        {
            _authInfos.Remove(userId);
            return false;
        }

        return true;
    }

    public static AuthInfo GenerateAuthInfo(string userId)
    {
        StringBuilder authId = new StringBuilder(10);
        for (int i = 0; i < 10; i++)
            authId[i] = Constants.AllChars[_random.Next(0, 62)];
        AuthInfo info = new AuthInfo(authId.ToString(), DateTime.UtcNow);
        _authInfos.Add(userId, info);
        return info;
    }
}