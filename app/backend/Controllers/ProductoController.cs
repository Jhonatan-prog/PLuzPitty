using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using app.backend.Models;
using app.backend.Services;


namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/Producto")]
    public class ProductoController : ControllerBase
    {
       

        //GET : api/Producto/Consultar
        [HttpGet]
        [Route("ConsultarTodos")]
        public List<Producto> ConsultarTodos()
        {
            ProductoService Servicio = new ProductoService();
            return Servicio.ConsultarTodos();
        }

        //GET : api/Producto/Consultar/{id}
        [HttpGet]
        [Route("Consultar/{id}")]
        public Producto Consultar(int Id_Producto)
        {
            ProductoService Servicio = new ProductoService();
            return Servicio.Consultar(Id_Producto);
        }

        //POST : api/Producto/Insertar
        [HttpPost]
        [ Route("Insertar")]
        public string Insertar([FromBody] Producto producto)
        {
            ProductoService Servicio = new ProductoService();
            Servicio.producto = producto;
            return Servicio.InsertarProducto();
        }

        //PUT : api/Producto/Actualizar
        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Producto producto)
        {
            ProductoService Servicio = new ProductoService();
            Servicio.producto = producto;
            return Servicio.ActualizarProdcuto();
        }

        //DELETE : api/Producto/Eliminar/{id}
        [HttpDelete]
        [Route("Eliminar/{id}")]
        public string EliminarXId(int Id_Producto)
        {
            ProductoService Servicio = new ProductoService();
            return Servicio.EliminarXId(Id_Producto);
        }


        
    }

}