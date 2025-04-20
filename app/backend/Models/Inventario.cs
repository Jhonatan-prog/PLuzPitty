using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
   public class Inventario
   {
        [Key]
        [Required]
        public int id_producto {get;set;}

        [Required]
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;

        [Required]
        public int cantidad_stock {get;set;}

        public List<Producto> Productos {get;set;} = new();
   }
    
}