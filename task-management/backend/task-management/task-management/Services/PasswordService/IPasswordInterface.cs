using task_management.Models;

namespace task_management.Services.PasswordService
{
    public interface IPasswordInterface
    {

        void createHashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt);

        bool isPasswordValid(string password, byte[] passwordHash, byte[] passwordSalt);

        string generateToken(UserModel user);

    }
}
