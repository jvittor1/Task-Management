using task_management.Enum;

namespace task_management.Dtos
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string type { get; set; }
        public bool Status { get; set; }
    }
}
