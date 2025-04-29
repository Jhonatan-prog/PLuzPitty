using Microsoft.AspNetCore.Mvc;
using app.backend.Services;
using app.backend.Models;
using app.backend.Patterns.FMethod;

namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProveedorController : ControllerBase
    {
        private readonly ProveedorService _servicio;

        private readonly LibrosProveedor _librosProveedor;
        private readonly ArticulosProveedor _articulosProveedor;

        public ProveedorController(ProveedorService servicio)
        {
            _servicio = servicio;

            // Creador de Proveedores (patrón de diseño Factory Method)
            _librosProveedor = new LibrosProveedor(servicio);
            _articulosProveedor = new ArticulosProveedor(servicio);
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

            string type = "libros".ToLower(); // proveedor.tipo.ToLower();
            
            ICreadorProveedor creador = type switch
            {
                "libros" => _librosProveedor,
                "articulos" => _articulosProveedor,
                _ => throw new ArgumentException("Tipo de proveedor no válido")
            };

            Proveedor prov = creador.crearProveedor(proveedor);

            if (prov == null)
                return BadRequest(new { message = "No se pudo registrar el proveedor" });
            return Ok(new { message = "Proveedor registrado correctamente" });
        }
    }
}