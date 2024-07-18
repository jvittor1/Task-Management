using Microsoft.OpenApi.Any;
using task_management.Dtos;
using task_management.Models;

namespace task_management.Services.TaskService
{
    public interface ITaskInterface
    {

        Task<Response<List<TaskModel>>> GetAllTasks(Guid userId);
        Task<Response<TaskModel>> GetTaskById(Guid id, Guid userId);
        Task<Response<TaskModel>> UpdateTask(TaskDto task, Guid userId);
        Task<Response<string>> DeleteTask(Guid id, Guid userId);
        Task<Response<string>> CreateTask(TaskRegisterDto task);
        Response<List<TaskType>> GetAllTaskTypes();

    }
}
