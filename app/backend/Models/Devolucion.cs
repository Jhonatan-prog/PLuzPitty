using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Devolucion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdDevolución { get; set; }
        
        [Required]
        public string Motivo { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal Valor { get; set; }
        
        [Required]
        public int CodigoProductoEntregado { get; set; }
        
        [Required]
        public int CodigoProductoDevuelto { get; set; }
        
        [Required]
        [StringLength(60)]
        public string NombreEmpleado { get; set; }
        
        [Required]
        public DateTime Fecha { get; set; }
        
        [Required]
        public int IdCliente { get; set; }
        
        [Required]
        [StringLength(100)]
        public string IdFactura { get; set; }
        
        // Navigation properties
        public virtual Factura Factura { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}