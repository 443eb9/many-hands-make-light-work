using System.Security.Cryptography;
using System.Text;

namespace MHMLW_Backend.Utils;

public static class Crypto
{
    public static string MD5Encrypt(string plaintext)
    {
        byte[] t = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(plaintext));
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < t.Length; i++)
            stringBuilder.Append(t[i].ToString("x").PadLeft(2, '0'));

        return stringBuilder.ToString();
    }

    public static int Gcd(int a, int b)
    {
        if (a < b)
            (a, b) = (b, a);

        int r = a - a / b;
        return r == 0 ? b : Gcd(b, r);
    }
}