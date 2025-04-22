using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdCliente { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
        
        [Required]
        [StringLength(15)]
        public string Telefono { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Dirección { get; set; }
        
        // Navigation properties
        public virtual ICollection<Factura> Facturas { get; set; }
        public virtual ICollection<Devolucion> Devoluciones { get; set; }
        public virtual ICollection<HistorialDomicilio> HistorialesDomicilio { get; set; }
    }
}