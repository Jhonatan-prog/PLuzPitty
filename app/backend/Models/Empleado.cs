using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    //Herencia: La clase Empleado hereda de la clase Usuario
    public class Empleado : Usuario
    {
       
        [Required]
        [StringLength(50)]
        public string Rol { get; set; } = string.Empty;
        
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Salario { get; set; }

        public List<Venta> Vetnas { get; set; } = new ();
        
    }
}