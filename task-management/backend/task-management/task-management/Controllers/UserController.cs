using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_management.Dtos;
using task_management.Services.UserService;

namespace task_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface _userInterface;
        public UserController(IUserInterface userInterface)
        {
            _userInterface = userInterface;
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginDto loginDto)
        {
            var response = await _userInterface.Login(loginDto);
            return Ok(response);
        }





        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegisterDto userRegister)
        {
            var response = await _userInterface.Register(userRegister);
            return Ok(response);
        }
    }
}
