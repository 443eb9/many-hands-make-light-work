namespace MHMLW_Backend.Models.Sql;

public record InfoTable(string schoolName, string address, string fee, string time);
public record MethodTable(string[] name, string[] contact, string[] working);
public record Post(int postId, int authorId, DateTime postTime, string content, InfoTable InfoTable, MethodTable MethodTable);