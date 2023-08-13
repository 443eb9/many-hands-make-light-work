using MHMLW_Backend.Factories;
using MHMLW_Backend.Managers;
using MHMLW_Backend.Models.Requests.ThirdParty;
using MHMLW_Backend.Models.Responses;
using Microsoft.AspNetCore.Mvc;

namespace MHMLW_Backend.Controllers;

[ApiController]
[Route("api/thirdParty")]
public class ThirdPartyController : ControllerBase
{
    [HttpPost("verifCode")]
    public IActionResult SendVerificationCode([FromBody] SendVerifCodeRequest data)
    {
        if (string.IsNullOrEmpty(data.email))
            return Ok(ResultFactory.CreateFailedResult(new MessageResponse("发送失败，请将表格填写完整")));

        VerificationCodeManager.SendVerifCode(data.email);
        return Ok(ResultFactory.CreateSuccessResult(new MessageResponse("发送成功")));
    }
}