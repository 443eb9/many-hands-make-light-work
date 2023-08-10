namespace MHMLW_Backend.Models;

public record ProcessResult(bool isSuccess, string? data = null)
{
    public bool isSuccess = isSuccess;
    public string data = data;
}