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

    public string? UserAuth(string username, string password)
    {
        MySqlCommand cmd = new("select * from mhmlw.auth where username = @username", Connection);
        cmd.Parameters.AddWithValue("@username", username);
        MySqlDataReader reader = cmd.ExecuteReader();

        if (!reader.Read())
        {
            reader.Close();
            return null;
        }

        string? result = reader.GetString("password") == password
            ? null
            : reader.GetString("user_id");
        reader.Close();
        return result;
    }

    public User? GetUser(string userId)
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

    public PostPreview[]? GetPostPreview(int offset, int length)
    {
        MySqlCommand cmd = new("select * from mhmlw.post order by post_id desc limit @offset, @length", Connection);
        cmd.Parameters.AddWithValue("@offset", offset);
        cmd.Parameters.AddWithValue("@length", length);
        var postReader = cmd.ExecuteReader();

        List<PostPreview> result = new List<PostPreview>(length);

        while (postReader.Read() && result.Count < length)
        {
            int userId = postReader.GetInt32("author_id");
            MySqlCommand cmdUsr = new($"select * from mhmlw.user where id = {userId}", Connection);
            var userReader = cmdUsr.ExecuteReader();
            userReader.Read();
            User author = new User
            (
                -1,
                userReader.GetString("name"),
                userReader.GetInt32("level"),
                userReader.GetInt32("province"),
                -1,
                -1
            );
            userReader.Close();
            result.Add(new PostPreview
            (
                author,
                postReader.GetDateTime("post_time").AddHours(8).ToString("yyyy MMMM dd HH:mm:ss"),
                postReader.GetString("content")[..50]
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
        MySqlCommand cmdUsr = new($"select * from mhmlw.user where id = {userId}", Connection);
        var userReader = cmdUsr.ExecuteReader();
        userReader.Read();
        User author = new User
        (
            -1,
            userReader.GetString("name"),
            userReader.GetInt32("level"),
            userReader.GetInt32("province"),
            -1,
            -1
        );
        userReader.Close();
        Post result = new Post
        (
            -1,
            author,
            postReader.GetDateTime("post_time").AddHours(8).ToString("yyyy MMMM dd HH:mm:ss"),
            postReader.GetString("content"),
            
        );
    }
}