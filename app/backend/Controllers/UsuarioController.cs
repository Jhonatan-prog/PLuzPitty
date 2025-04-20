using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using app.backend.Models;
using app.backend.Services;
using BCrypt.Net;
using app.backend.App_Data;

namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/Usuario")]
    public class UsuarioController : ControllerBase
    {
        private MiContextoDeDatos _contex = new MiContextoDeDatos();

        //GET : api/Usuario/ConsultarTodos
        [HttpGet]
        [Route("ConsultarTodos")]
        public List<Usuario> ConsultarTodos()
        {
            UsuarioService Servicio = new UsuarioService();
            return Servicio.ConsultarTodos();
        }    

        //GET :api/Usuario/Consultar?id=1
        [HttpGet]
        [Route("Consultar")]
        public Usuario Consultar(int id)
        {
            UsuarioService Servicio = new UsuarioService();
            return Servicio.Consultar(id);
        }

        [HttpPost]
        [Route("CrearUsuario")]
        public string CrearUsuario ([FromBody] Usuario usuario)
        {
            // Encriptar la contraseña
            usuario.Contraseña = BCrypt.Net.BCrypt.HashPassword(usuario.Contraseña);
            UsuarioService servicio = new UsuarioService();
            servicio.usuario = usuario;
            return servicio.CrearUsuario();
        }

        //PUT : api/Producto/Actualizar
        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Usuario usuario)
        {
            UsuarioService Servicio = new UsuarioService();
            Servicio.usuario = usuario;
            return Servicio.ActualizarUsuario();
        }

        //DELETE : api/Usuario/Eliminar?id=1
        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar(int IdUsuario)
        {
            UsuarioService Servicio = new UsuarioService();
            return Servicio.EliminarXId(IdUsuario);
        }
        
    }

    /*
Postman Se puede probar asi
     {
        
        "nombreUsuario": "Alejandro",
        "contraseña": "andro",
        "correo": "fff@cjf",
        "nombreRol": "ADMINISTRADOR",
        "telefono": 3028575,
        "roler": [
            {
                "nombreRol": "1"
            }
        ],
        "facturas": []
    }
    */
}
