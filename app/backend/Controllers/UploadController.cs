using Microsoft.AspNetCore.Mvc;
using app.backend.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace app.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly UploadImagenService _uploadService;

        public UploadController()
        {
            _uploadService = new UploadImagenService();
        }
        //http://localhost:5000/api/Upload/subir/producto o Proveedor
        [HttpPost("subir/{tipo}")]
        public async Task<IActionResult> Subir(IFormFile archivo, string tipo)
        {
            string carpeta = tipo.ToLower() switch
            {
                "producto" => "imagenes/productos",
                "proveedor" => "imagenes/proveedores",
                _ => "imagenes/otros"
            };

            try
            {
                string nombre = await _uploadService.SubirArchivo(archivo, carpeta);
                return Ok(nombre);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
    
    /* Devuelve {
                        "archivo": "c3dae7b2-9d08-4f43-9187-580939565236.jpg"
                    } eso se debe pegar en el campo imagen cuando se vaya ingresar un producto*/ 
}
