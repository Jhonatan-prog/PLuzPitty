using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class RolPermiso
    {
        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string NombreRol { get; set; }
        
        [Key]
        [Column(Order = 2)]
        [StringLength(100)]
        public string NombrePermiso { get; set; }
        
        // Navigation properties
        public virtual Rol Rol { get; set; }
        public virtual Permiso Permiso { get; set; }
    }
}