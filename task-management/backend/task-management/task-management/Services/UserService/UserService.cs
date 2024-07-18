using Microsoft.EntityFrameworkCore;
using task_management.Data;
using task_management.Dtos;
using task_management.Models;
using task_management.Services.PasswordService;

namespace task_management.Services.UserService
{
    public class UserService : IUserInterface
    {
        private readonly AppDbContext _context;
        private readonly IPasswordInterface _passwordInterface;

        public UserService(AppDbContext context, IPasswordInterface passwordInterface) { 
            
            _context = context;
            _passwordInterface = passwordInterface;
           
        }

        public async Task<Response<UserRegisterDto>> Register(UserRegisterDto userRegister)
        {
            Response <UserRegisterDto> response = new Response<UserRegisterDto> ();

            try
            {
                if (!EmailIsValid(userRegister))
                {
                    response.Value = null;
                    response.Message = "Email already registered.";
                    response.Status = false;

                }

               else
                {
                    _passwordInterface.createHashPassword(userRegister.Password, out byte[] passwordHash, out byte[] passwordSalt);
                    UserModel user = new UserModel()
                    {
                        Id = Guid.NewGuid(),
                        Email = userRegister.Email,
                        Name = userRegister.Name,
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt

                    };
                    
                    _context.User.Add(user);
                    await _context.SaveChangesAsync ();

                    response.Message = "Registered Successful";
                }   

            }
            catch (Exception ex)
            {
                response.Value = null;
                response.Message = ex.Message;
                response.Status = false;
            }
            return response;
        }

        public async Task<Response<string>> Login(UserLoginDto loginDto)
        {
            Response<string> response = new Response<string> ();
            
            try
            {
                var user = await _context.User.FirstOrDefaultAsync(userDb => userDb.Email == loginDto.Email);

                if (user == null)
                {
                    response.Message = "Invalid credentials.";
                    response.Status= false;
                    return response;
                }

                if(!_passwordInterface.isPasswordValid(loginDto.Password, user.PasswordHash, user.PasswordSalt))
                {
                    response.Value = user.PasswordHash.ToString();
                    response.Message = "Invalid credentials.";
                    response.Status = false;
                    return response;
                }

                var token = _passwordInterface.generateToken(user);

                response.Value = token;
                response.Message = "Successful login";
                response.Status = true;
              

            } catch (Exception ex)
            {
                response.Value = null;
                response.Message = ex.Message;
                response.Status = false;
            }

            return response ;
        }


        public bool EmailIsValid(UserRegisterDto userRegister) { 
            
            var user = _context.User.FirstOrDefault(userDb => userDb.Email == userRegister.Email);
            
            if (user == null)
            {
                return true;
            }
            return false;
        }
    }


}
