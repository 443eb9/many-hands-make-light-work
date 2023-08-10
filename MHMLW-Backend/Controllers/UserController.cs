using MHMLW_Backend.Models;
using MHMLW_Backend.Models.Requests;
using MHMLW_Backend.Sql;
using MHMLW_Common;
using Microsoft.AspNetCore.Mvc;

namespace MHMLW_Backend.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest data)
    {
        string? userId = Database.Instance.UserAuth(data.username, data.password);
        if (string.IsNullOrEmpty(userId))
            return Ok(new ProcessResult(false, "登录失败，请检查你的用户名和密码"));

        User? user = Database.Instance.GetUser(userId);
        if (user == null)
            return Ok(new ProcessResult(false, "出现未知错误，请联系网站管理员，错误代码100"));

        return Ok(new ProcessResult(true));
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest data)
    {
        
    }
}