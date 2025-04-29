using app.backend.Patterns.FMethod;
using app.backend.Services;
using app.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace app.backend.Patterns.FMethod
{
    public abstract class CreadorProveedor : ICreadorProveedor {
        protected string nombre;
        protected readonly ProveedorService _servicio;

        public CreadorProveedor(string nombre, ProveedorService servicio)
        {
            this.nombre = nombre;
            
            _servicio = servicio;
        }

        public Proveedor crearProveedor() {
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

            boolean ok = servicio.Insertar(nuevoProveedor);

            if (!ok) {
                throw new Exception("Error al insertar el proveedor en la base de datos.");
            }

            this.proveedores.Add(nuevoProveedor);

            return nuevoProveedor;
        }

        public abstract Proveedor? obtenerInfo();

        public ActionResult<List<Proveedor>> consultarTodos() {
            return _servicio.ConsultarTodos();
        }

        public abstract string metodoPago();
    }

    public class LibroProveedor : CreadorProveedor // type
    {
        public MPP(string nombre, ProveedorService servicio) : base(nombre, servicio)
        {
        }

        public override Proveedor? obtenerInfo() {
            return null;
        }

        /* public override ActionResult<List<Proveedor>> consultarTodos() {
            return _servicio.ConsultarTodos();
        } */

        public override string metodoPago() {
            return "Efectivo";
        }
    }

    public class ArticulosProveedor : CreadorProveedor
    {
        public Penafargo(string nombre, ProveedorService servicio) : base(nombre, servicio)
        {
        }

        public override Proveedor? obtenerInfo() {
            return null;
        }

        /* public override ActionResult<List<Proveedor>> consultarTodos() {
            return _servicio.ConsultarTodos();
        } */

        public override string metodoPago() {
            return "Efectivo";
        }
    }
}