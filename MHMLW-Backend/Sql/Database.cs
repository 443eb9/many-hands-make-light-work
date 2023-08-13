using MHMLW_Backend.Models.ClientSide;
using MHMLW_Backend.Models.Data;
using MHMLW_Backend.Models.Requests.User;
using MHMLW_Backend.Utils;
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

    public int? UserAuth(string username, string password)
    {
        MySqlCommand cmd = new("select * from mhmlw.auth where username = @username", Connection);
        cmd.Parameters.AddWithValue("@username", username);
        MySqlDataReader reader = cmd.ExecuteReader();

        if (!reader.Read())
        {
            reader.Close();
            return null;
        }

        int? result = reader.GetString("password") == password
            ? null
            : reader.GetInt32("user_id");
        reader.Close();
        return result;
    }

    public User? GetUser(int userId)
    {
        MySqlCommand cmd = new("select * from mhmlw.user where id = @id", Connection);
        cmd.Parameters.AddWithValue("@id", userId);
        MySqlDataReader reader = cmd.ExecuteReader();

        User? result = reader.Read()
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

        reader.Close();
        return result;
    }

    public bool RegisterUser(RegisterRequest data)
    {
        using (MySqlCommand cmd = new("select email from mhmlw.auth where email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@email", Crypto.MD5Encrypt(data.email));
            MySqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                reader.Close();
                return false;
            }

            reader.Close();
        }

        using (MySqlCommand cmd = new("insert into mhmlw.auth set username = @username,password = @password, email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@username", data.username);
            cmd.Parameters.AddWithValue("@password", Crypto.MD5Encrypt(data.password));
            cmd.Parameters.AddWithValue("@email", Crypto.MD5Encrypt(data.email));
            cmd.ExecuteNonQuery();
        }

        using (MySqlCommand cmd = new("insert into mhmlw.user set name = @name, province = @province", Connection))
        {
            cmd.Parameters.AddWithValue("@name", data.username);
            cmd.Parameters.AddWithValue("@province", data.province);
            cmd.ExecuteNonQuery();
        }

        return true;
    }

    public bool UpdateUser(string password, string email)
    {
        using (MySqlCommand cmd = new("select email from mhmlw.auth where email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@email", Crypto.MD5Encrypt(email));
            MySqlDataReader reader = cmd.ExecuteReader();

            if (!reader.Read())
            {
                reader.Close();
                return false;
            }

            reader.Close();
        }

        using (MySqlCommand cmd = new("update mhmlw.auth set password = @password where email = @email", Connection))
        {
            cmd.Parameters.AddWithValue("@password", Crypto.MD5Encrypt(password));
            cmd.Parameters.AddWithValue("@email", Crypto.MD5Encrypt(email));
            cmd.ExecuteNonQuery();
            return true;
        }
    }

    public PostPreview[]? GetPostPreview(int offset, int length, int[] excludedProvince)
    {
        MySqlCommand cmd;

        if (excludedProvince.Length != 0)
        {
            string excl = string.Join(",", excludedProvince);
            cmd = new($"select * from mhmlw.post where province not in ({excl}) order by post_id desc limit @offset, @length", Connection);
        }
        else
            cmd = new($"select * from mhmlw.post order by post_id desc limit @offset, @length", Connection);

        cmd.Parameters.AddWithValue("@offset", offset);
        cmd.Parameters.AddWithValue("@length", length);
        var postReader = cmd.ExecuteReader();

        List<PostPreview> result = new List<PostPreview>(length);

        while (postReader.Read() && result.Count < length)
        {
            int userId = postReader.GetInt32("author_id");
            User? author = GetUser(userId);
            if (author == null)
                throw new Exception($"未找到用户：{userId}");

            string content = postReader.GetString("content");
            result.Add(new PostPreview
            (
                postReader.GetInt32("post_id"),
                author,
                postReader.GetDateTime("post_time").AddHours(8).ToString("yyyy/MM/dd HH:mm:ss"),
                content.Length > 50 ? content[..50] : content
            ));
        }

        postReader.Close();
        return result.Count == 0 ? null : result.ToArray();
    }

    public Post? GetPost(int postId)
    {
        MySqlCommand cmd = new("select * from mhmlw.post where post_id = @post_id", Connection);
        cmd.Parameters.AddWithValue("postId", postId);
        var postReader = cmd.ExecuteReader();

        if (!postReader.Read())
            return null;

        int userId = postReader.GetInt32("author_id");
        User? author = GetUser(userId);
        if (author == null)
            throw new Exception($"未找到用户：{userId}");

        Post result = new Post
        (
            postId,
            author,
            postReader.GetDateTime("post_time").AddHours(8).ToString("yyyy/MM/dd HH:mm:ss"),
            postReader.GetString("content"),
            new InfoTable
            (
                postReader.GetString("school_name"),
                postReader.GetString("address"),
                postReader.GetString("fee"),
                postReader.GetString("time")
            ),
            new MethodTable
            (
                postReader.GetString("organization_name").Split("||"),
                postReader.GetString("organization_contact").Split("||"),
                postReader.GetString("organization_working").Split("||")
            )
        );

        postReader.Close();
        return result;
    }
}