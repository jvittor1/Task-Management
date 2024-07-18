
namespace task_management.Models
{
    public class Response <T>
    {
        public T? Value { get; set; }   
        public string Message { get; set; } = string.Empty;

        public bool Status { get; set; } = true;

    }
}
