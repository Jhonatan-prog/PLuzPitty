using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Producto
    {
        [Key]
        [StringLength(100)]
        public string CodigoProducto { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
        
        public string Descripcion { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal VlrUnitario { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal VlrSinIva { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal VlrCompra { get; set; }
        
        [Required]
        public int Stock { get; set; }
        
        [Required]
        public DateTime FechaIngreso { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Imagen { get; set; }=null!;
        
        //Propiedades de navegación
        public virtual ICollection<FacturaProducto> FacturaProductos { get; set; } = new HashSet<FacturaProducto>();
        public virtual ICollection<ProductoProveedor> ProductoProveedores { get; set; } = new HashSet<ProductoProveedor>();
        public virtual ICollection<Inventario> Inventarios { get; set; } = new HashSet<Inventario>();
    }
}