namespace MHMLW_Common;

public record Post(User author, string content, string[] classInfo, string[][] methodInfo)
{
    public User author = author;
    public string content = content;
    public string[] classInfo = classInfo;
    public string[][] methodInfo = methodInfo;
}