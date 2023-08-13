using MHMLW_Backend.Models.Data;

namespace MHMLW_Backend.Models.ClientSide;

public record PostPreview(int postId, User author, string postTime, string preview);