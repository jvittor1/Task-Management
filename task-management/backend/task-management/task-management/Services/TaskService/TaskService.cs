using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using task_management.Data;
using task_management.Dtos;
using task_management.Enum;
using task_management.Models;
namespace task_management.Services.TaskService
{
    public class TaskService : ITaskInterface
    {
        private readonly AppDbContext _context;
        public TaskService(AppDbContext context)
        {
            _context = context;
            
        }

        public async Task<Response<string>> CreateTask(TaskRegisterDto taskRegisterDto)
        {
            Response<string> response = new Response<string>();

            try
            {
                
                if(System.Enum.TryParse<TypeEnum>(taskRegisterDto.type, true, out var typeValue))
                {
                    

                    TaskModel newTask = new TaskModel
                    {
                        Id = Guid.NewGuid(), 
                        Name = taskRegisterDto.Name,
                        Data = taskRegisterDto.Data,
                        StartTime = taskRegisterDto.StartTime,
                        EndTime = taskRegisterDto.EndTime,
                        type = typeValue,
                        Status = false, 
                        UserId = taskRegisterDto.UserId 
                    };

                    if (!validDate(newTask.Data))
                    {
                        response.Status = false;
                        response.Message = "Invalid date format. Please use dd/MM/yyyy.";
                        return response;
                    }

                    if (!validTime(newTask.StartTime, newTask.EndTime))
                    {
                        response.Status = false;
                        response.Message = "Invalid time format or end time is not greater than start time.";
                        return response;
                    }


                    _context.Tasks.Add(newTask);
                    await _context.SaveChangesAsync();
                    response.Value = newTask.Id.ToString();
                    response.Message = "Task created successfully.";
                    response.Status = true;

                }
                else { 
                    
                    response.Status = false;
                    response.Message = "Invalid task type";
                }

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
                response.Value = null;
            }

            return response;
        }

        public async Task<Response<string>> DeleteTask(Guid id, Guid userId)
        {
            Response<string> response = new Response<string>();

            try
            {
                var task = await _context.Tasks.FirstOrDefaultAsync(taskDatabase => taskDatabase.Id == id && taskDatabase.UserId == userId);

                if (task == null)
                {
                    response.Status = false;
                    response.Message = "Task not found.";
                    return response;

                }
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();

                response.Status = true;
                response.Message = "Task deleted successfully.";
                }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<Response<List<TaskModel>>> GetAllTasks(Guid userId)
        {
            Response<List<TaskModel>> response = new Response<List<TaskModel>>();

            try
            {
                var tasks = await _context.Tasks
                    .Where(task => task.UserId == userId)
                    .ToListAsync();



                response.Value = tasks;
                response.Message = "Tasks retrieved successfully.";
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
                response.Value = null;
            }

            return response;
        }

        public Response<List<TaskType>> GetAllTaskTypes()
        {
            Response<List<TaskType>> response = new Response<List<TaskType>>();

            try
            {
                var taskTypes = System.Enum.GetValues(typeof(TypeEnum))
                                    .Cast<TypeEnum>()
                                    .Select(e => new TaskType
                                    {
                                        Name = e.ToString(),
                                        Value = (int)e
                                    })
                                    .ToList();

                response.Value = taskTypes;
                response.Message = "Task types retrieved successfully.";
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
                response.Value = null;
            }

            return response;
        }



        public async Task<Response<TaskModel>> GetTaskById(Guid id, Guid userId)
        {
            Response<TaskModel> response = new Response<TaskModel>();

            try
            {
                var task = await _context.Tasks.FirstOrDefaultAsync(taskDatabase => taskDatabase.Id == id && taskDatabase.UserId == userId);

                if (task == null)
                {
                    response.Value = null;
                    response.Status = false;
                    response.Message = "Task not found.";
                    return response;
                }

                response.Value = task;
                response.Message = "Task retrieved successfully.";
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
                response.Value = null;
            }

            return response;
        }

        public async Task<Response<TaskModel>> UpdateTask(Guid id, TaskDto task, Guid userId)
        {
            Response<TaskModel> response = new Response<TaskModel>();

            try
            {
                var newTask = await _context.Tasks.FirstOrDefaultAsync(taskDatabase => taskDatabase.Id == id && taskDatabase.UserId == userId);
                

                if (newTask == null)
                {
                    response.Value = null;
                    response.Message = "Task not found.";
                    response.Status = false;
                    return response;
                }

                if (System.Enum.TryParse<TypeEnum>(task.type, true, out var typeValue))

                newTask.Name = task.Name;
                newTask.Data = task.Data;
                newTask.StartTime = task.StartTime;
                newTask.EndTime = task.EndTime;
                newTask.type = typeValue;
                newTask.Status = task.Status;

                if (!validDate(newTask.Data))
                {
                    response.Status = false;
                    response.Message = "Invalid date format. Please use MM/dd/yyyy.";
                    return response;
                }

                if (!validTime(newTask.StartTime, newTask.EndTime))
                {
                    response.Status = false;
                    response.Message = "Invalid time format or end time is not greater than start time.";
                    return response;
                }

                _context.Tasks.Update(newTask);
                await _context.SaveChangesAsync();
                
                response.Status = true;
                response.Message = "Update successfully";

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }

            return response;
        }



        public bool validDate(string date)
        {
            string format = "MM/dd/yyyy";
            DateTime parsedDate;
            bool isValid = DateTime.TryParseExact(date, format, null, System.Globalization.DateTimeStyles.None, out parsedDate);

            return isValid;
        }

        public bool validTime(string startTime , string endTime)
        {
            string format = "HH:mm";
            DateTime parsedStartTime;
            DateTime parsedEndTime;

          
            bool isStartTimeValid = DateTime.TryParseExact(startTime, format, null, System.Globalization.DateTimeStyles.None, out parsedStartTime);
            bool isEndTimeValid = DateTime.TryParseExact(endTime, format, null, System.Globalization.DateTimeStyles.None, out parsedEndTime);

            return isStartTimeValid && isEndTimeValid && parsedEndTime > parsedStartTime;


        }

           

    }
}
