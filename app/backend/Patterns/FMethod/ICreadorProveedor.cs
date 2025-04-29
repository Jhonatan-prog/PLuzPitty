using app.backend.Services;
using app.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace app.backend.Patterns.FMethod
{
    public interface ICreadorProveedor
    {
        Proveedor crearProveedor();
        Proveedor? obtenerInfo();
        ActionResult<List<Proveedor>> consultarTodos();
        string metodoPago();
    }
}
