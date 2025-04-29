using app.backend.Patterns.FMethod;
using app.backend.Services;
using app.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace app.backend.Patterns.FMethod
{
    // Esta clase es la clase base para los creadores de proveedores
    // Aplicando el patrón Factory Method
    public abstract class CreadorProveedor : ICreadorProveedor {
        protected readonly ProveedorService _servicio;
        protected List<Proveedor> librosProveedores;
        protected List<Proveedor> articulosProveedores;

        public CreadorProveedor(ProveedorService servicio)
        {
            _servicio = servicio;
            this.librosProveedores = new List<Proveedor>();
            this.articulosProveedores = new List<Proveedor>();
        }

        public abstract ActionResult<List<Proveedor>> consultarTodos();

        public abstract Proveedor? obtenerInfo();

        public abstract Proveedor? crearProveedor(Proveedor proveedor);

        public abstract string metodoPago();
    }

    public class LibrosProveedor : CreadorProveedor
    {
        public LibrosProveedor(ProveedorService servicio) : base(servicio)
        {
        }

        public override ActionResult<List<Proveedor>> consultarTodos() {
            return _servicio.ConsultarTodos();
        }

        public override Proveedor? obtenerInfo() {
            return null;
        }

        public override Proveedor? crearProveedor(Proveedor proveedor) {
            Proveedor nuevoProveedor = new Proveedor
            {
                Nit = proveedor.Nit,
                Nombre = proveedor.Nombre,
                NombreContacto = proveedor.NombreContacto,
                Telefono = proveedor.Telefono,
                Direccion = proveedor.Direccion,
                Redes = proveedor.Redes,
                Imagen = proveedor.Imagen
            };

            bool ok = _servicio.Insertar(nuevoProveedor);

            if (!ok) {
                throw new Exception("Error al insertar el proveedor en la base de datos.");
            }

            this.librosProveedores.Add(nuevoProveedor);

            return nuevoProveedor;
        }

        public override string metodoPago() {
            return "Efectivo";
        }
    }

    public class ArticulosProveedor : CreadorProveedor
    {
        public ArticulosProveedor(ProveedorService servicio) : base(servicio)
        {
        }

        public override ActionResult<List<Proveedor>> consultarTodos() {
            return _servicio.ConsultarTodos();
        }

        public override Proveedor? obtenerInfo() {
            return null;
        }

        public override Proveedor? crearProveedor(Proveedor proveedor) {
            Proveedor nuevoProveedor = new Proveedor
            {
                Nit = proveedor.Nit,
                Nombre = proveedor.Nombre,
                NombreContacto = proveedor.NombreContacto,
                Telefono = proveedor.Telefono,
                Direccion = proveedor.Direccion,
                Redes = proveedor.Redes,
                Imagen = proveedor.Imagen
            };

            bool ok = _servicio.Insertar(nuevoProveedor);

            if (!ok) {
                throw new Exception("Error al insertar el proveedor en la base de datos.");
            }

            this.articulosProveedores.Add(nuevoProveedor);

            return nuevoProveedor;
        }

        public override string metodoPago() {
            return "Efectivo";
        }
    }
}