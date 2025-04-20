using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    public class Producto 
    {
        [Key]
        public int Id_Producto {get;set;}

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(50)]
        public string Descripcion {get;set;}

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio_Unitario { get; set; }
        [Required]
        [StringLength(50)]
        public string Categoria {get;set;}

    }
}