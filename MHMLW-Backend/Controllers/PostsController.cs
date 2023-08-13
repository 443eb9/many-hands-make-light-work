using MHMLW_Backend.Factories;
using MHMLW_Backend.Managers;
using MHMLW_Backend.Models.ClientSide;
using MHMLW_Backend.Models.Data;
using MHMLW_Backend.Models.Requests.Posts;
using MHMLW_Backend.Models.Responses;
using MHMLW_Backend.Models.Responses.Posts;
using MHMLW_Backend.Sql;
using Microsoft.AspNetCore.Mvc;

namespace MHMLW_Backend.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    [HttpPost("get")]
    public IActionResult GetPostsPreview([FromBody] GetPostsPreviewRequest data)
    {
        string? s = AuthManager.CheckUserAuth(HttpContext.Request.Headers);
        if (s != null) return Ok(s);

        PostPreview[]? result = Database.Instance.GetPostPreview(data.offset, data.length);
        return result == null
            ? Ok(ResultFactory.CreateFailedResult(new MessageResponse("你已经到世界的尽头了")))
            : Ok(ResultFactory.CreateSuccessResult(new GetPostsPreviewResponse(result)));
    }

    [HttpPost("get/{postId}")]
    public IActionResult GetPost(int postId)
    {
        string? s = AuthManager.CheckUserAuth(HttpContext.Request.Headers);
        if (s != null) return Ok(s);

        Post? result = Database.Instance.GetPost(postId);
        return result == null
            ? Ok(ResultFactory.CreateFailedResult(new MessageResponse("帖子不存在")))
            : Ok(ResultFactory.CreateSuccessResult(new GetPostResponse(result)));
    }
}