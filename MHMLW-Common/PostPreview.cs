namespace MHMLW_Common;

public record PostPreview(User author, string postTime, string preview)
{
    public User author = author;
    public string postTime = postTime;
    public string preview = preview;
}