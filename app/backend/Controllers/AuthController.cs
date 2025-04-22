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
            }*/
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            _controlConexion.AbrirBd();
            string comandoSQL = "SELECT COUNT(*) FROM usuario WHERE Correo = @Correo AND contraseña = @Contraseña";
            var parametros = new[]
            {
                new SqlParameter("@Correo", login.Correo),
                new SqlParameter("@Contraseña", login.Contraseña)
            };
            var result = _controlConexion.EjecutarConsultaSql(comandoSQL, parametros);
            _controlConexion.CerrarBd();

            if (result.Rows[0][0].ToString() == "1")
            {
                var token = _tokenService.GenerateToken(login.Correo);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
    }
}