using task_management.Dtos;
using task_management.Models;

namespace task_management.Services.UserService
{
    public interface IUserInterface
    {
        Task<Response<UserRegisterDto>> Register(UserRegisterDto userRegister);

        Task<Response<string>> Login(UserLoginDto loginDto);
    }
}
