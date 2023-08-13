using System.Net;
using System.Net.Mail;

namespace MHMLW_Backend.Managers;

public static class VerificationCodeManager
{
    private static Random _random = new(DateTime.UtcNow.Millisecond);
    private static SmtpClient _smtpClient = new("smtp.qq.com", 25)
    {
        Credentials = new NetworkCredential("3166943013@qq.com", "pyvuzkzphaabdgif"),
        EnableSsl = true
    };
    private static Dictionary<string, string> _verifCodeMapper = new();

    public static void SendVerifCode(string email)
    {
        if (_verifCodeMapper.ContainsKey(email))
            return;

        _verifCodeMapper[email] = _random.Next(100000, 999999).ToString();
        MailMessage verifCode = new MailMessage()
        {
            From = new MailAddress("3166943013@qq.com", "学生互助维权", System.Text.Encoding.UTF8),
            Subject = "学生互助维权 - 验证码",
            Body = _verifCodeMapper[email],
            IsBodyHtml = false
        };
        verifCode.To.Add(email);
        _smtpClient.Send(verifCode);
    }

    public static bool ValidateCode(string email, string code)
    {
        if (!_verifCodeMapper.ContainsKey(email))
            return false;

        bool result = _verifCodeMapper[email] == code;
        _verifCodeMapper.Remove(email);
        return result;
    }
}