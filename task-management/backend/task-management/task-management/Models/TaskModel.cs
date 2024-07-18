using System.ComponentModel.DataAnnotations.Schema;
using task_management.Enum;

namespace task_management.Models
{
    public class TaskModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public TypeEnum type { get; set; }
        public bool Status { get; set; }

        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public UserModel User { get; set; }

    }
}
