using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Factura
    {
        [Key]
        [StringLength(100)]
        public string IdFactura { get; set; }
        
        [Required]
        public DateTime FechaCompra { get; set; }
        
        [Required]
        public int Nit { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Direccion { get; set; }
        
        [Required]
        public int Telefono { get; set; }
        
        [StringLength(60)]
        public string Redes { get; set; }
        
        [Required]
        public short Cantidad { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal VlrUnitario { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal TotalPagar { get; set; }
        
        [Required]
        public int IdCliente { get; set; }
        
        // Navigation properties
        public virtual Cliente Cliente { get; set; }
        public virtual ICollection<FacturaProducto> FacturaProductos { get; set; }
        public virtual ICollection<Transaccion> Transacciones { get; set; }
        public virtual ICollection<Devolucion> Devoluciones { get; set; }
        public virtual ICollection<HistorialDomicilio> HistorialesDomicilio { get; set; }
    }
}