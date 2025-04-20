using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    public class Venta: Transaccion
    {
        public double CostoTotal { get; set; } = 0.0;

        public List<Producto> ListaProductos { get; set; } = new();

     // Clave foránea hacia Empleado
        public int EmpleadoId { get; set; }

         public Empleado Empleado { get; set; }

        public List<Devolucion> Devoluciones { get; set; } = new ();
        public List<Producto> Productos {get;set;} = new();
    }
}