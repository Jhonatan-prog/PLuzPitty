using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace app.backend.Services
{
    public class UploadImagenService
    {
        public async Task<string> SubirArchivo(IFormFile archivo, string carpetaDestino)
        {
            if (archivo == null || archivo.Length == 0)
                throw new ArgumentException("Archivo no válido");

            var nombreUnico = Guid.NewGuid().ToString() + Path.GetExtension(archivo.FileName);
            var rutaCarpeta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", carpetaDestino);

            if (!Directory.Exists(rutaCarpeta))
                Directory.CreateDirectory(rutaCarpeta);

            var rutaArchivo = Path.Combine(rutaCarpeta, nombreUnico);
            using (var stream = new FileStream(rutaArchivo, FileMode.Create))
            {
                await archivo.CopyToAsync(stream);
            }

            return nombreUnico;
        }

        public bool EliminarArchivo(string nombreArchivo, string tipo)
        {
            try
            {
                string carpeta = tipo.ToLower() switch
                {
                    "producto" => "imagenes_productos",
                    "proveedor" => "imagenes_proveedores",
                    _ => throw new ArgumentException("Tipo no válido")
                };

                string ruta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", carpeta, nombreArchivo);
                if (File.Exists(ruta))
                {
                    File.Delete(ruta);
                    return true;
                }
                    return false;
            }
            catch
            {
                return false;
            }
        }

    }

}
