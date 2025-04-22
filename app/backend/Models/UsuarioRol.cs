using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class UsuarioRol
    {
        [Key]
        [Column(Order = 1)]
        public int IdUsuario { get; set; }
        
        [Key]
        [Column(Order = 2)]
        [StringLength(50)]
        public string NombreRol { get; set; }
        
        // Navigation properties
        public virtual Usuario? Usuario { get; set; } // Nullable si usas C# 8+
        public virtual Rol? Rol { get; set; }
    }

}