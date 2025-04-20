using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    public class Devolucion: Transaccion
    {
         public string Motivo { get; set; } = string.Empty;

     
        public Venta VentaAsociada { get; set; }
        public int VentaId { get; set; }

    }
}