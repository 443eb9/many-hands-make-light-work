using System.Text;
using MHMLW_Backend.Factories;
using MHMLW_Backend.Models;
using MHMLW_Backend.Utils;
using Microsoft.Extensions.Primitives;

namespace MHMLW_Backend.Managers;

public static class AuthManager
{
    private static Random _random = new(DateTime.UtcNow.Millisecond);
    private static Dictionary<string, AuthInfo> _authIdToInfo = new();
    private static Dictionary<int, string> _userIdToAuthId = new();

    public static string? CheckUserAuth(IHeaderDictionary headers)
    {
        if (!headers.TryGetValue("authId", out StringValues value))
            return ResultFactory.CreateFailedResult("请先登录后再查看帖子");

        if (!_authIdToInfo.ContainsKey(value[0]))
            return ResultFactory.CreateFailedResult("身份验证不通过，请重新登录");

        if (value.Count == 0)
            return ResultFactory.CreateFailedResult("无效请求头，请刷新页面或重新登录");

        if (_authIdToInfo[value[0]].expireAt > DateTime.UtcNow)
        {
            _authIdToInfo.Remove(value[0]);
            return ResultFactory.CreateFailedResult("身份验证过期，请重新登录");
        }

        return null;
    }

    public static AuthInfo GenerateAuthInfo(int userId)
    {
        if (_userIdToAuthId.TryGetValue(userId, out string? existedId))
            return _authIdToInfo[existedId];

        StringBuilder authId = new StringBuilder(10);
        for (int i = 0; i < 10; i++)
            authId.Append(Constants.AllChars[_random.Next(0, Constants.AllChars.Length)]);

        string authIdStr = authId.ToString();
        AuthInfo info = new AuthInfo(userId, authIdStr, DateTime.UtcNow);
        _authIdToInfo[authIdStr] = info;
        _userIdToAuthId[userId] = authIdStr;
        return info;
    }
}