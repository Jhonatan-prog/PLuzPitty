using app.backend.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Data.Common;


namespace app.backend.Services
{
    public class ProductoService
    {
        private readonly ControlConexion _conexion;

        public ProductoService(ControlConexion conexion)
        {
            _conexion = conexion;
        }

        public List<Producto> ConsultarTodos()
        {
            var productos = new List<Producto>();
            _conexion.AbrirBd();

            string consulta = "SELECT * FROM Producto";
            var tabla = _conexion.EjecutarConsultaSql(consulta, null);

            foreach (DataRow fila in tabla.Rows)
            {
                productos.Add(new Producto
                {
                    CodigoProducto = Convert.ToInt32(fila["CodigoProducto"]),
                    Nombre = fila["Nombre"].ToString() ?? "",
                    Descripcion = fila["Descripcion"]?.ToString(),
                    VlrUnitario = Convert.ToDecimal(fila["VlrUnitario"]),
                    VlrSinIva = Convert.ToDecimal(fila["VlrSinIva"]),
                    VlrCompra = Convert.ToDecimal(fila["VlrCompra"]),
                    Stock = Convert.ToInt32(fila["Stock"]),
                    FechaIngreso = Convert.ToDateTime(fila["FechaIngreso"]),
                    Imagen = fila["imagen"].ToString() ?? ""
                });
            }

            _conexion.CerrarBd();
            return productos;
        }

        public bool Insertar(Producto p)
        {
            _conexion.AbrirBd();

            string sql = @"INSERT INTO Producto 
                (Nombre, Descripcion, VlrUnitario, VlrSinIva, VlrCompra, Stock, FechaIngreso, imagen)
                VALUES (@Nombre, @Descripcion, @VlrUnitario, @VlrSinIva, @VlrCompra, @Stock, @FechaIngreso, @imagen)";

            var parametros = new[]
            {
                _conexion.CreateParameter("@Nombre", p.Nombre),
                _conexion.CreateParameter("@Descripcion", p.Descripcion),
                _conexion.CreateParameter("@VlrUnitario", p.VlrUnitario),
                _conexion.CreateParameter("@VlrSinIva", p.VlrSinIva),
                _conexion.CreateParameter("@VlrCompra", p.VlrCompra),
                _conexion.CreateParameter("@Stock", p.Stock),
                _conexion.CreateParameter("@FechaIngreso", p.FechaIngreso),
                _conexion.CreateParameter("@imagen", p.Imagen)
            };

            int filas = _conexion.EjecutarComandoSql(sql, parametros);
            _conexion.CerrarBd();
            return filas > 0;
        }

        public bool ActualizarProducto(Producto producto)
        {
            string sql = @"UPDATE Producto 
                       SET Nombre = @Nombre,
                           Descripcion = @Descripcion,
                           VlrUnitario = @VlrUnitario,
                           VlrSinIva = @VlrSinIva,
                           VlrCompra = @VlrCompra,
                           Stock = @Stock,
                           FechaIngreso = @FechaIngreso,
                           imagen = @imagen
                       WHERE CodigoProducto = @CodigoProducto";

            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@Nombre", producto.Nombre),
                _conexion.CreateParameter("@Descripcion", producto.Descripcion),
                _conexion.CreateParameter("@VlrUnitario", producto.VlrUnitario),
                _conexion.CreateParameter("@VlrSinIva", producto.VlrSinIva),
                _conexion.CreateParameter("@VlrCompra", producto.VlrCompra),
                _conexion.CreateParameter("@Stock", producto.Stock),
                _conexion.CreateParameter("@FechaIngreso", producto.FechaIngreso),
                _conexion.CreateParameter("@imagen", producto.Imagen),
                _conexion.CreateParameter("@CodigoProducto", producto.CodigoProducto)
            };  

                _conexion.AbrirBd();
                int filas = _conexion.EjecutarComandoSql(sql, parametros);
                _conexion.CerrarBd();

                return filas > 0;
        }

        public bool EliminarProducto(int id)
        {
            string sql = "DELETE FROM Producto WHERE CodigoProducto = @id";

            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@id", id)
            };

            _conexion.AbrirBd();
            int filas = _conexion.EjecutarComandoSql(sql, parametros);
            _conexion.CerrarBd();

            return filas > 0;
        }

        
    }
}
