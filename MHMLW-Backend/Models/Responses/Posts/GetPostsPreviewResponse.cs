using MHMLW_Backend.Models.ClientSide;

namespace MHMLW_Backend.Models.Responses.Posts;

public record GetPostsPreviewResponse(PostPreview[] previews);