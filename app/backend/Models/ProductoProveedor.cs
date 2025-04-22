using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class ProductoProveedor
    {
        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string Nit { get; set; }
        
        [Key]
        [Column(Order = 2)]
        public int CodigoProducto { get; set; }
        
        // Navigation properties
        public virtual Proveedor Proveedor { get; set; }
        public virtual Producto Producto { get; set; }
    }
}