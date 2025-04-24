using Microsoft.AspNetCore.Mvc;
using app.backend.Services;
using app.backend.Models;

namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProveedorController : ControllerBase
    {
        private readonly ProveedorService _servicio;

        public ProveedorController(ProveedorService servicio)
        {
            _servicio = servicio;
        }


        //http://localhost:5000/api/Proveedor/ConsultarTodos
        [HttpGet("ConsultarTodos")]
        public ActionResult<List<Proveedor>> ConsultarTodos()
        {
            return _servicio.ConsultarTodos();
        }
        
        //http://localhost:5000/api/Proveedor/ConsultarPorNit/{nit}
        [HttpGet("ConsultarPorNit/{nit}")]
        public ActionResult<Proveedor?> ConsultarPorNit(string nit)
        {
            var proveedor = _servicio.ConsultarPorNit(nit);
            if (proveedor == null)
                return NotFound(new { message = "Proveedor no encontrado" });
            return proveedor;
        }

        //http://localhost:5000/api/Proveedor/Insertar
        [HttpPost("Insertar")]
        public ActionResult Insertar([FromBody] Proveedor proveedor)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool resultado = _servicio.Insertar(proveedor);
            if (resultado)
                return Ok(new { message = "Proveedor registrado correctamente" });
            return BadRequest(new { message = "No se pudo registrar el proveedor" });
        }
    }
}