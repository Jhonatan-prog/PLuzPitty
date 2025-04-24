using app.backend.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using BCrypt.Net;

namespace app.backend.Services
{
    public class UsuarioService
    {
        private readonly ControlConexion _conexion;

        public UsuarioService(ControlConexion conexion)
        {
            _conexion = conexion;
        }

        public List<Usuario> ConsultarTodos()
        {
            var usuarios = new List<Usuario>();
            _conexion.AbrirBd();

            string consulta = "SELECT * FROM Usuario";
            var tabla = _conexion.EjecutarConsultaSql(consulta, null);

            foreach (DataRow fila in tabla.Rows)
            {
                usuarios.Add(new Usuario
                {
                    IdUsuario = Convert.ToInt32(fila["IdUsuario"]),
                    NombreUsuario = fila["NombreUsuario"].ToString() ?? "",
                    Contraseña = fila["Contraseña"].ToString() ?? "",
                    Correo = fila["Correo"].ToString() ?? "",
                    NombreRol = fila["NombreRol"].ToString() ?? "",
                    Telefono = fila["Telefono"].ToString() ?? ""
                    // Las propiedades de navegación no se cargan aquí
                });
            }

            _conexion.CerrarBd();
            return usuarios;
        }

        public Usuario? ConsultarPorId(int id)
        {
            Usuario? usuario = null;
            _conexion.AbrirBd();

            string consulta = "SELECT * FROM Usuario WHERE IdUsuario = @IdUsuario";
            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@IdUsuario", id)
            };

            var tabla = _conexion.EjecutarConsultaSql(consulta, parametros);

            if (tabla.Rows.Count > 0)
            {
                DataRow fila = tabla.Rows[0];
                usuario = new Usuario
                {
                    IdUsuario = Convert.ToInt32(fila["IdUsuario"]),
                    NombreUsuario = fila["NombreUsuario"].ToString() ?? "",
                    Contraseña = fila["Contraseña"].ToString() ?? "",
                    Correo = fila["Correo"].ToString() ?? "",
                    NombreRol = fila["NombreRol"].ToString() ?? "",
                    Telefono = fila["Telefono"].ToString() ?? ""
                };
            }

            _conexion.CerrarBd();
            return usuario;
        }

        public Usuario? ConsultarPorCorreo(string correo)
        {
            Usuario? usuario = null;
            _conexion.AbrirBd();

            string consulta = "SELECT * FROM Usuario WHERE Correo = @Correo";
            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@Correo", correo)
            };

            var tabla = _conexion.EjecutarConsultaSql(consulta, parametros);

            if (tabla.Rows.Count > 0)
            {
                DataRow fila = tabla.Rows[0];
                usuario = new Usuario
                {
                    IdUsuario = Convert.ToInt32(fila["IdUsuario"]),
                    NombreUsuario = fila["NombreUsuario"].ToString() ?? "",
                    Contraseña = fila["Contraseña"].ToString() ?? "",
                    Correo = fila["Correo"].ToString() ?? "",
                    NombreRol = fila["NombreRol"].ToString() ?? "",
                    Telefono = fila["Telefono"].ToString() ?? ""
                };
            }

            _conexion.CerrarBd();
            return usuario;
        }

        public bool VerificarCredenciales(string correo, string contraseña)
        {
            var usuario = ConsultarPorCorreo(correo);
            if (usuario == null)
                return false;

            // Verifica si la contraseña coincide con el hash almacenado
            return BCrypt.Net.BCrypt.Verify(contraseña, usuario.Contraseña);
        }

        public bool Insertar(Usuario usuario)
        {
            // Encripta la contraseña antes de guardarla
            usuario.Contraseña = BCrypt.Net.BCrypt.HashPassword(usuario.Contraseña);
            
            _conexion.AbrirBd();

            string sql = @"INSERT INTO Usuario 
                (NombreUsuario, Contraseña, Correo, NombreRol, Telefono)
                VALUES (@NombreUsuario, @Contraseña, @Correo, @NombreRol, @Telefono)";

            var parametros = new[]
            {
                _conexion.CreateParameter("@NombreUsuario", usuario.NombreUsuario),
                _conexion.CreateParameter("@Contraseña", usuario.Contraseña),
                _conexion.CreateParameter("@Correo", usuario.Correo),
                _conexion.CreateParameter("@NombreRol", usuario.NombreRol),
                _conexion.CreateParameter("@Telefono", usuario.Telefono)
            };

            int filas = _conexion.EjecutarComandoSql(sql, parametros);
            _conexion.CerrarBd();
            return filas > 0;
        }

        public bool ActualizarUsuario(Usuario usuario)
        {
            _conexion.AbrirBd();

            // Primero verificamos si necesitamos actualizar la contraseña
            string sqlOriginal = "SELECT Contraseña FROM Usuario WHERE IdUsuario = @IdUsuario";
            var paramId = _conexion.CreateParameter("@IdUsuario", usuario.IdUsuario);
            
            var resultadoOriginal = _conexion.EjecutarConsultaSql(sqlOriginal, new[] { paramId });
            string contraseñaActual = "";
            
            if (resultadoOriginal.Rows.Count > 0)
            {
                contraseñaActual = resultadoOriginal.Rows[0]["Contraseña"].ToString() ?? "";
            }

            // Si la contraseña es diferente de la actual, encriptarla
            if (!string.IsNullOrEmpty(usuario.Contraseña) && usuario.Contraseña != contraseñaActual)
            {
                usuario.Contraseña = BCrypt.Net.BCrypt.HashPassword(usuario.Contraseña);
            }

            string sql = @"UPDATE Usuario 
                       SET NombreUsuario = @NombreUsuario,
                           Contraseña = @Contraseña,
                           Correo = @Correo,
                           NombreRol = @NombreRol,
                           Telefono = @Telefono
                       WHERE IdUsuario = @IdUsuario";

            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@NombreUsuario", usuario.NombreUsuario),
                _conexion.CreateParameter("@Contraseña", usuario.Contraseña),
                _conexion.CreateParameter("@Correo", usuario.Correo),
                _conexion.CreateParameter("@NombreRol", usuario.NombreRol),
                _conexion.CreateParameter("@Telefono", usuario.Telefono),
                _conexion.CreateParameter("@IdUsuario", usuario.IdUsuario)
            };  

            int filas = _conexion.EjecutarComandoSql(sql, parametros);
            _conexion.CerrarBd();

            return filas > 0;
        }

        public bool EliminarUsuario(int id)
        {
            string sql = "DELETE FROM Usuario WHERE IdUsuario = @IdUsuario";

            var parametros = new DbParameter[]
            {
                _conexion.CreateParameter("@IdUsuario", id)
            };

            _conexion.AbrirBd();
            int filas = _conexion.EjecutarComandoSql(sql, parametros);
            _conexion.CerrarBd();

            return filas > 0;
        }
    }
}