using Microsoft.AspNetCore.Mvc;
using app.backend.Services;
using app.backend.Models;

namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/Producto")]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _servicio;

        public ProductoController(ProductoService servicio)
        {
            _servicio = servicio;
        }

        //http://localhost:5000/api/producto/ConsultarTodos
        [HttpGet]
        [Route("ConsultarTodos")]
        public List<Producto> ConsultarTodos()
        {
            return _servicio.ConsultarTodos();
        }

        ////http://localhost:5000/api/producto/Insertar
        [HttpPost]
        [Route("Insertar")]
        public ActionResult Insertar([FromBody] Producto producto)
        {
            bool resultado = _servicio.Insertar(producto);
            if (resultado)
                return Ok(new { message = "Producto registrado correctamente" });
            return BadRequest(new { message = "No se pudo registrar el producto" });
        }

        //http://localhost:5000/api/producto/Actualizar/1

        [HttpPut("{id}")]
        [Route("Actualizar")]
        public IActionResult Actualizar(int id, [FromBody] Producto producto)
        {
            if (id != producto.CodigoProducto)
                return BadRequest("ID en la ruta no coincide con el del producto");

            var resultado = _servicio.ActualizarProducto(producto);
            return resultado ? Ok("Producto actualizado") : NotFound("Producto no encontrado");
        }

        //http://localhost:5000/api/producto/Eliminar/1

        [HttpDelete("{id}")]
        [Route("Eliminar")]
        public IActionResult Eliminar(int id)
        {
            var resultado = _servicio.EliminarProducto(id);
            return resultado ? Ok("Producto eliminado") : NotFound("Producto no encontrado");
        }
    }
}
