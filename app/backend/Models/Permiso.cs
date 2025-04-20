using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    public class Permiso
    {   
        [Key]
        public int id_permiso { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(2)]
        [RegularExpression("Si|No")]
        public string Estado { get; set; }
        
         public List<Rol> Roles { get; set; } = new();
    }
}