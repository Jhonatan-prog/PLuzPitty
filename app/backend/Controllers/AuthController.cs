using app.backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using app.backend.Models;
using Microsoft.Data.SqlClient;

namespace app.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly ControlConexion _controlConexion; // Cambiado a ControlConexion

        public AuthController(TokenService tokenService, ControlConexion controlConexion) // Cambiado a ControlConexion
        {
            _tokenService = tokenService;
            _controlConexion = controlConexion;
        }

        //http://localhost:5000/api/Auth/login
        /*Ejemplo  {
             "Correo": "Juan@12correo",
                "Contraseña": "$2a$11$lSIrWQMQLF2FMbwGggiCX.vmA/1UJ9oDfGzaZU1Di4sKD6T7YqPHy"


             POST http://localhost:5000/api/auth/login
            Headers:
             KEY:Content-Type:  VALUE: application/json

            {
                "Correo": "Juan@12correo",
                "Contraseña": "12345"
            } 

        }*/

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            try
            {
                _controlConexion.AbrirBd();
        
                // 1. Primero obtener el hash almacenado del usuario
                string getHashSql = "SELECT Contraseña, Correo FROM usuario WHERE Correo = @Correo";
                var parametros = new[]
                {
                    new SqlParameter("@Correo", login.Correo)
                };
        
                var result = _controlConexion.EjecutarConsultaSql(getHashSql, parametros);

                if (result.Rows.Count == 0)
                {
                    return Unauthorized(new { Mensaje = "Usuario no encontrado" });
                }

                string storedHash = result.Rows[0]["Contraseña"].ToString();
                string correo = result.Rows[0]["Correo"].ToString();
        
                // 2. Verificar la contraseña plana con el hash BCrypt
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Contraseña, storedHash);

                if (isPasswordValid)
                {
                    var token = _tokenService.GenerateToken(correo);
                    return Ok(new { Token = token });
                }

                return Unauthorized(new { Mensaje = "Contraseña incorrecta" });
            }
            finally
            {
                _controlConexion.CerrarBd();
            }
        }   
        
    }
}