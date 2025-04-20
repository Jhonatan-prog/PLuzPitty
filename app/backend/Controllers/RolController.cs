using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using app.backend.Models;
using app.backend.Services;

namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/Rol")]
    public class  RolController : ControllerBase
    {
        //GET : api/Rol/ConsultarTodos
        [HttpGet]
        [Route("ConsultarTodos")]
        public List<Rol> ConsultarTodos()
        {
            RolService Servicio = new RolService();
            return Servicio.ConsultarTodos();
        }    
 
        //GET :api/Rol/Consultar?id=1
        [HttpGet]
        [Route("Consultar")]
        public Rol Consultar(int id)
        {
            RolService Servicio = new RolService();
            return Servicio.Consultar(id);
        }
 
        //POST : api/Rol/Insertar
        [HttpPost]
        [ Route("Insertar")]
        public string Insertar([FromBody] Rol rol)
        {
            RolService Servicio = new RolService();
            Servicio.rol = rol;
            return Servicio.Insertar();
        }
 
        //PUT : api/Rol/Actualizar
        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Rol rol)
        {
            RolService Servicio = new RolService();
            Servicio.rol = rol;
            return Servicio.ActualizarRol();
        }
 
        //DELETE : api/Rol/Eliminar?id_rol=1
        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar(int id_rol)
        {
            RolService Servicio = new RolService();
            return Servicio.EliminarXID(id_rol);
        }
    } 
}