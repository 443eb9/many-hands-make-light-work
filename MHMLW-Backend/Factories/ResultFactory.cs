using MHMLW_Backend.Models;
using Newtonsoft.Json;

namespace MHMLW_Backend.Factories;

public static class ResultFactory
{
    public static string CreateSuccessResult(object? data) =>
        JsonConvert.SerializeObject(new ProcessResult(true, data));
    
    public static string CreateFailedResult(object? data) =>
        JsonConvert.SerializeObject(new ProcessResult(false, data));
}