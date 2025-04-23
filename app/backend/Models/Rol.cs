using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace app.backend.Models
{
    public class Rol
    {
        [Key]
        [StringLength(50)]
        public string NombreRol { get; set; }
        
        [Required]
        [StringLength(50)]
        public string NombrePermiso { get; set; }
        
        [Required]
        [StringLength(2)]
        public string Estado { get; set; }
        
        // Navigation properties
        public virtual ICollection<RolPermiso> RolPermisos { get; set; } = new HashSet<RolPermiso>();
        public virtual ICollection<UsuarioRol> UsuarioRoles { get; set; } = new HashSet<UsuarioRol>();
    }

}