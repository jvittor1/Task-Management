using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using task_management.Dtos;
using task_management.Services.TaskService;

namespace task_management.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskInterface _taskInterface;
        public TaskController(ITaskInterface taskInterface)
        {
            _taskInterface = taskInterface;
        }


        [HttpPost("createTask")]
        public async Task<ActionResult> CreateTask(TaskRegisterDto task)
        {
            
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = Guid.Parse(userIdClaim.Value);

            if (task.UserId != userId)
            {
                return Unauthorized("You are not authorized to create a task for another user.");
            }


            var response = await _taskInterface.CreateTask(task);

            if (!response.Status)
            {
                return BadRequest(response.Message);
            }
            return Ok(response);
        }


        [HttpPut("updateTask/{id}")]
         public async Task<ActionResult> UpdateTask(Guid id, [FromBody] TaskDto task)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = Guid.Parse(userIdClaim.Value);

            var response = await _taskInterface.UpdateTask(id, task, userId);
            if (!response.Status)
            {
                return BadRequest(response.Message);
            }
            return Ok(response);
        }


        [HttpDelete("deleteTask/{id}")]
        public async Task<ActionResult> DeleteTask(Guid id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = Guid.Parse(userIdClaim.Value);

            var response = await _taskInterface.DeleteTask(id, userId);
            if (!response.Status)
            {
                return BadRequest(response.Message);
            }
            return Ok(response);
        }

        [HttpGet("getAllTasks")]
        public async Task<ActionResult> GetAllTasks()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = Guid.Parse(userIdClaim.Value);

            var tasks = await _taskInterface.GetAllTasks(userId);
            
            if (!tasks.Status)
            {
                return BadRequest(tasks.Message);
            }
            return Ok(tasks);
        }



        [HttpGet("getTaskById/{taskId}")]
        public async Task<ActionResult> GetTaskById(Guid taskId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = Guid.Parse(userIdClaim.Value);

            var task = await _taskInterface.GetTaskById(taskId, userId);
            if (task.Value == null)
            {
                return NotFound(task.Message);
            }
            return Ok(task);
        }

        [AllowAnonymous]
        [HttpGet("getAllTypes")]
        public ActionResult GetAllTaskTypes()
        {
            var types = _taskInterface.GetAllTaskTypes();

            if (!types.Status)
            {
                return BadRequest(types.Message);
            }

            return Ok(types);
        }

    }
}
