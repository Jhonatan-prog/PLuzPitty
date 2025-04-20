using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    //Herencia: La clase Cliente hereda de la clase Usuario
    public class Cliente : Usuario
    {
        
       public List<Venta> HistorialCompras { get; set; } = new ();
    }
}