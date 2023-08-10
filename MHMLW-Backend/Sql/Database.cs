using MHMLW_Backend.Models.Requests.User;
using MHMLW_Backend.Utils;
using MHMLW_Common;
using MySql.Data.MySqlClient;

namespace MHMLW_Backend.Sql;

public class Database
{
    private int _curConIdx;
    private MySqlConnection[] _connections;

    private static Database? _database;
    public static Database Instance => _database ??= new Database();

    public MySqlConnection Connection
    {
        get
        {
            lock (_connections)
            {
                _curConIdx++;
                if (_curConIdx >= _connections.Length)
                    _curConIdx = 0;
                return _connections[_curConIdx];
            }
        }
    }

    public Database()
    {
        _curConIdx = 0;
        _connections = new MySqlConnection[8];
        new Thread(UpdateConnection).Start();
    }

    private async void UpdateConnection()
    {
        lock (_connections)
        {
            for (int i = 0; i < _connections.Length; i++)
            {
                _connections[i] = new MySqlConnection(Constants.SqlConnectCommand);
                _connections[i].Open();
            }
        }

        await Task.Delay(TimeSpan.FromHours(2));
    }

    public string? UserAuth(string username, string password)
    {
        MySqlCommand cmd = new("select * from mhmlw.auth where username = @username", Connection);
        cmd.Parameters.AddWithValue("@username", username);
        MySqlDataReader reader = cmd.ExecuteReader();

        if (!reader.Read())
            return null;

        return reader.GetString("password") == password
            ? null
            : reader.GetString("user_id");
    }

    public User? GetUser(string userId)
    {
        MySqlCommand cmd = new("select * from mhmlw.user where id = @id", Connection);
        cmd.Parameters.AddWithValue("@id", userId);
        MySqlDataReader reader = cmd.ExecuteReader();

        return reader.Read()
            ? new User
            (
                userId,
                reader.GetString("name"),
                reader.GetInt32("level"),
                reader.GetInt32("province"),
                reader.GetInt32("helped"),
                reader.GetInt32("being_helped")
            )
            : null;
    }

    public bool RegisterUser(RegisterRequest data)
    {
        using (MySqlCommand cmd = new("select email from mhmlw.auth where email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@email", data.email);
            if (cmd.ExecuteReader().Read())
                return false;
        }

        using (MySqlCommand cmd = new("insert into mhmlw.auth set username = @username,password = @password, email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@username", data.username);
            cmd.Parameters.AddWithValue("@password", data.password);
            cmd.Parameters.AddWithValue("@email", data.email);
            cmd.ExecuteNonQuery();
        }

        return true;
    }

    public bool UpdateUser(string password, string email)
    {
        using (MySqlCommand cmd = new("select email from mhmlw.auth where email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@email", email);
            if (!cmd.ExecuteReader().Read())
                return false;
        }

        using (MySqlCommand cmd = new("update mhmlw.auth set password = @password where email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@email", email);
            cmd.ExecuteNonQuery();
            return true;
        }
    }
}