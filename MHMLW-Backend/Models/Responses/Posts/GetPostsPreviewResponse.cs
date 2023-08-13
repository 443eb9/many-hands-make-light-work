using MHMLW_Backend.Models.ClientSide;

namespace MHMLW_Backend.Models.Responses;

public record GetPostsPreviewResponse(PostPreview[] previews);