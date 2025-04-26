using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Transaccion
    {
        [Key]
        [StringLength(100)]
        public string CodigoTransaccion { get; set; }
        
        [Required]
        public DateTime Fecha { get; set; }
        
        [Required]
        [StringLength(2)]
        public string Estado { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal Subtotal { get; set; }
        
        [Required]
        [StringLength(100)]
        public string IdFactura { get; set; }
        
        // Navigation property
        public virtual Factura Factura { get; set; }
    }
}