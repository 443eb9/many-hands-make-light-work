using MHMLW_Backend.Factories;
using MHMLW_Backend.Managers;
using MHMLW_Backend.Models;
using MHMLW_Backend.Models.Data;
using MHMLW_Backend.Models.Requests.User;
using MHMLW_Backend.Models.Responses;
using MHMLW_Backend.Models.Responses.User;
using MHMLW_Backend.Sql;
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
            return Ok(ResultFactory.CreateFailedResult(new LoginResponse("登录失败，请检查你的用户名和密码")));

        User? user = Database.Instance.GetUser(userId);

        if (user == null)
            return Ok(ResultFactory.CreateFailedResult(new LoginResponse("出现未知错误，请联系网站管理员，错误代码100")));

        AuthInfo authInfo = AuthManager.GenerateAuthInfo(user.id);
        return Ok(ResultFactory.CreateSuccessResult(new LoginResponse("登录成功，正在跳转至主页面", authInfo)));
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest data)
    {
        if (string.IsNullOrEmpty(data.username) || string.IsNullOrEmpty(data.password) || string.IsNullOrEmpty(data.email) || string.IsNullOrEmpty(data.verifCode))
            return Ok(ResultFactory.CreateFailedResult(new MessageResponse("注册失败，请将表格填写完整")));

        if (data.password.Length < 10)
            return Ok(ResultFactory.CreateFailedResult(new MessageResponse("注册失败，请至少输入10位密码")));

        if (!VerificationCodeManager.ValidateCode(data.email, data.verifCode))
            return Ok(ResultFactory.CreateFailedResult(new MessageResponse("注册失败，验证码错误")));

        return Database.Instance.RegisterUser(data)
            ? Ok(ResultFactory.CreateSuccessResult(new MessageResponse("注册成功，请前往登录界面登录")))
            : Ok(ResultFactory.CreateFailedResult(new MessageResponse("注册失败，邮箱已被注册或验证码错误")));
    }

    [HttpPost("retrieve")]
    public IActionResult Retrieve([FromBody] RetrieveRequest data)
    {
        if (!VerificationCodeManager.ValidateCode(data.email, data.verifCode))
            return Ok(ResultFactory.CreateFailedResult("修改密码失败，请检查你的验证码是否正确"));

        return Database.Instance.UpdateUser(data.newPassword, data.email)
            ? Ok(ResultFactory.CreateFailedResult("修改密码成功，请前往登录界面登录"))
            : Ok(ResultFactory.CreateSuccessResult("修改密码失败，请确认此邮箱是否已被注册"));
    }
}