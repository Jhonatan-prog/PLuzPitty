using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Proveedor
    {
        [Key]
        [StringLength(100)]
        public string Nit { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
        
        [Required]
        [StringLength(100)]
        public string NombreContacto { get; set; }
        
        [Required]
        [StringLength(15)]
        public string Telefono { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Direccion { get; set; }
        
        [StringLength(60)]
        public string Redes { get; set; }

        [Required]
        [StringLength(255)]
        public string Imagen { get; set; }=null!;
        
        // Navigation property
        public virtual ICollection<ProductoProveedor> ProductoProveedores { get; set; } = new HashSet<ProductoProveedor>();
    }
}