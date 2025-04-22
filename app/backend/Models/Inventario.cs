using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.backend.Models
{
   public class Inventario
   {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdInventario { get; set; }
        
        [Required]
        [StringLength(255)]
        public string ImagenProducto { get; set; }
        
        [Required]
        public int Cantidad { get; set; }
        
        [Required]
        [StringLength(60)]
        public string NombreProducto { get; set; }
        
        public string DescripcionProducto { get; set; }
        
        [Required]
        [StringLength(2)]
        public string Estado { get; set; }
        
        [Required]
        public int CodigoProducto { get; set; }
        
        // Navigation property
        public virtual Producto Producto { get; set; }
   }
    
}