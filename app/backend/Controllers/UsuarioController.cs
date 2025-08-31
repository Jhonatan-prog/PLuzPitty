using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization; // Importa el espacio de nombres para el control de autorización en ASP.NET Core.
using app.backend.Models;
using app.backend.Services;
using System;
using System.Collections.Generic;

namespace app.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // GET: api/Usuario
        [HttpGet]
        public ActionResult<IEnumerable<Usuario>> GetUsuarios()
        {
            try
            {
                var usuarios = _usuarioService.ConsultarTodos();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public ActionResult<Usuario> GetUsuario(int id)
        {
            try
            {
                var usuario = _usuarioService.ConsultarPorId(id);

                if (usuario == null)
                {
                    return NotFound($"Usuario con ID {id} no encontrado");
                }

                // No devolvemos la contraseña en la respuesta
                usuario.Contraseña = "";
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Usuario/correo/usuario@ejemplo.com
        [HttpGet("correo/{correo}")]
        public ActionResult<Usuario> GetUsuarioPorCorreo(string correo)
        {
            try
            {
                var usuario = _usuarioService.ConsultarPorCorreo(correo);

                if (usuario == null)
                {
                    return NotFound($"Usuario con correo {correo} no encontrado");
                }

                // No devolvemos la contraseña en la respuesta
                usuario.Contraseña = "";
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // POST: api/Usuario
        [HttpPost]
        [AllowAnonymous] // Permitir registro sin autenticación
        public ActionResult<Usuario> CrearUsuario([FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null)
                {
                    return BadRequest("Datos de usuario inválidos");
                }

                // Verificar si el correo ya existe
                var usuarioExistente = _usuarioService.ConsultarPorCorreo(usuario.Correo);
                if (usuarioExistente != null)
                {
                    return Conflict($"Ya existe un usuario con el correo {usuario.Correo}");
                }

                bool resultado = _usuarioService.Insertar(usuario);
                
                if (resultado)
                {
                    // No devolvemos la contraseña en la respuesta
                    usuario.Contraseña = "";
                    return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario);
                }
                else
                {
                    return StatusCode(500, "No se pudo crear el usuario");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public IActionResult ActualizarUsuario(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null || id != usuario.IdUsuario)
                {
                    return BadRequest("ID de usuario no coincide con el cuerpo de la solicitud");
                }

                var usuarioExistente = _usuarioService.ConsultarPorId(id);
                if (usuarioExistente == null)
                {
                    return NotFound($"Usuario con ID {id} no encontrado");
                }

                bool resultado = _usuarioService.ActualizarUsuario(usuario);
                
                if (resultado)
                {
                    return NoContent(); // 204 No Content
                }
                else
                {
                    return StatusCode(500, "No se pudo actualizar el usuario");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public IActionResult EliminarUsuario(int id)
        {
            try
            {
                var usuario = _usuarioService.ConsultarPorId(id);
                if (usuario == null)
                {
                    return NotFound($"Usuario con ID {id} no encontrado");
                }

                bool resultado = _usuarioService.EliminarUsuario(id);
                
                if (resultado)
                {
                    return NoContent(); // 204 No Content
                }
                else
                {
                    return StatusCode(500, "No se pudo eliminar el usuario");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        
    }    

}