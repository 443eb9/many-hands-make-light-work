namespace MHMLW_Backend.Models.Data;

public record InfoTable(string schoolName, string address, string fee, string time);

public record MethodTable(string[] name, string[] contact, string[] working);

public record Post(int postId, User author, string postTime, string content, InfoTable InfoTable, MethodTable MethodTable);