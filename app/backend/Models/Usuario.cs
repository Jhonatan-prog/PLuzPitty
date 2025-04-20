using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
        public int Telefono { get; set; }
        
        //Composición:Un Usuario tiene muchos roles(Relacion uno a muchos) 
        public List<Rol> Roler { get; set; } = new ();

        //Realcion Uno a muchos: un usuario tiene muchas factura
        public List<Facturacion> Facturas {get;set;} = new ();
    }
}