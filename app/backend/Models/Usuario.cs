using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Usuario
    {
        [Key]
        
        public int IdUsuario { get; set; }
        
        [Required]
        [StringLength(100)]
        public string NombreUsuario { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Contraseña { get; set; }
        
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Correo { get; set; }
        
        [Required]
        [StringLength(50)]
        public string NombreRol { get; set; }
        
        [Required]
        public string Telefono { get; set; }
        
        // Navigation properties
        public virtual ICollection<UsuarioRol> UsuarioRoles { get; set; } = new HashSet<UsuarioRol>();
        public virtual ICollection<HistorialDomicilio> HistorialesDomicilio { get; set; } = new HashSet<HistorialDomicilio>();
    }
}