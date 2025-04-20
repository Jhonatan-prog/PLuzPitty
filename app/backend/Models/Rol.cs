using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.backend.Models
{
    public class Rol
    {   
        [Key]
        public int id_rol { get; set; }

        [Required]
        [StringLength(50)]
        public string NombreRol { get; set; }
        
        //Composición:Un Rol pertenece a un usuario
        public int IdUsuario { get; set; }
        public Usuario? Usuario { get; set; }
         // Relación con la clase Usuario

        //Agragación= Un rol puede tener muchos permisos,pero los permisos existen por separado
         public List<Permiso>Permisos{get;set;} = new ();


        
    }
}