using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class HistorialDomicilio
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdHistorialDomicilio { get; set; }
        
        [Required]
        public DateTime Fecha { get; set; }
        
        [Required]
        public int IdCliente { get; set; }
        
        [Required]
        public int CcEmpleado { get; set; }
        
        [Required]
        [StringLength(100)]
        public string IdFactura { get; set; }
        
        // Navigation properties
        public virtual Factura Factura { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}