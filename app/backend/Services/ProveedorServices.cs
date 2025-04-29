using app.backend.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Data.Common;


namespace app.backend.Services
{
     public class ProveedorService
    {
        private readonly ControlConexion _conexion;

        public ProveedorService(ControlConexion conexion)
        {
            _conexion = conexion;
        }

        public List<Proveedor> ConsultarTodos()
        {
            var proveedores = new List<Proveedor>();
            _conexion.AbrirBd();

            string consulta = "SELECT Nit, Nombre, NombreContacto, Telefono, Direccion, Redes, imagen FROM Proveedor";
            var tabla = _conexion.EjecutarConsultaSql(consulta, null);

            foreach (DataRow fila in tabla.Rows)
            {
                proveedores.Add(new Proveedor
                {
                    Nit = fila["Nit"].ToString() ?? "",
                    Nombre = fila["Nombre"].ToString() ?? "",
                    NombreContacto = fila["NombreContacto"].ToString() ?? "",
                    Telefono = fila["Telefono"].ToString() ?? "",
                    Direccion = fila["Direccion"].ToString() ?? "",
                    Redes = fila["Redes"]?.ToString(),
                    Imagen = fila["imagen"].ToString() ?? ""
                });
            }

            _conexion.CerrarBd();
            return proveedores;
        }

        public Proveedor? ConsultarPorNit(string nit)
        {
            Proveedor? proveedor = null;
            _conexion.AbrirBd();

            string consulta = "SELECT Nit, Nombre, NombreContacto, Telefono, Direccion, Redes, imagen FROM Proveedor WHERE Nit = @Nit";
            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@Nit", nit)
            };

            var tabla = _conexion.EjecutarConsultaSql(consulta, parametros);

            if (tabla.Rows.Count > 0)
            {
                DataRow fila = tabla.Rows[0];
                proveedor = new Proveedor
                {
                    Nit = fila["Nit"].ToString() ?? "",
                    Nombre = fila["Nombre"].ToString() ?? "",
                    NombreContacto = fila["NombreContacto"].ToString() ?? "",
                    Telefono = fila["Telefono"].ToString() ?? "",
                    Direccion = fila["Direccion"].ToString() ?? "",
                    Redes = fila["Redes"]?.ToString(),
                    Imagen = fila["imagen"].ToString() ?? ""
                };
            }

            _conexion.CerrarBd();
            return proveedor;
        }

        public bool Insertar(Proveedor proveedor)
        {
            _conexion.AbrirBd();

            string sql = @"INSERT INTO Proveedor 
                (Nit, Nombre, NombreContacto, Telefono, Direccion, Redes, imagen)
                VALUES (@Nit, @Nombre, @NombreContacto, @Telefono, @Direccion, @Redes, @imagen)";

            var parametros = new[]
            {
                _conexion.CreateParameter("@Nit", proveedor.Nit),
                _conexion.CreateParameter("@Nombre", proveedor.Nombre),
                _conexion.CreateParameter("@NombreContacto", proveedor.NombreContacto),
                _conexion.CreateParameter("@Telefono", proveedor.Telefono),
                _conexion.CreateParameter("@Direccion", proveedor.Direccion),
                _conexion.CreateParameter("@Redes", proveedor.Redes ?? (object)DBNull.Value),
                _conexion.CreateParameter("@imagen", proveedor.Imagen)
            };

            int filas = _conexion.EjecutarComandoSql(sql, parametros);
            _conexion.CerrarBd();
            return filas > 0;
        }
    }
}