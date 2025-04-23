using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Permiso
    {
        [Key]
        [StringLength(100)]
        public string NombrePermiso { get; set; }
        
        [Required]
        [StringLength(2)]
        public string Estado { get; set; }
        
        // Navigation property
        public virtual ICollection<RolPermiso> RolPermisos { get; set; }
    }
}