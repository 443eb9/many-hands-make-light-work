namespace MHMLW_Backend.Models;

public record ProcessResult(bool isSuccess, object? data = null)
{
    public bool isSuccess = isSuccess;
    public object? data = data;
}