namespace MHMLW_Backend.Models.Requests.Posts;

public record GetPostsPreviewRequest(int offset, int length, int[] exludedProvinces, int[] expectMethods);