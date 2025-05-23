using app.backend.Services;
using app.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace app.backend.Patterns.FMethod
{
    public interface ICreadorProveedor
    {
        ActionResult<List<Proveedor>> consultarTodos();
        Proveedor? obtenerInfo();
        Proveedor crearProveedor(Proveedor proveedor);
        string metodoPago();
    }
}
