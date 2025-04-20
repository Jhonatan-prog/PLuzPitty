using app.backend.App_Data;
using app.backend.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace app.backend.Services
{
    public class LoginService
    {
        public  LoginService()
        {
            LoginRespuesta = new LoginRespuesta();
        }
        public MiContextoDeDatos _context = new MiContextoDeDatos();
        required public LoginModel login { get; set; }
        public LoginRespuesta LoginRespuesta { get; set; }

       
        public LoginRespuesta ValidarUsuario()
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Usuario) || string.IsNullOrWhiteSpace(login.Clave))
            {
                return new LoginRespuesta
                {
                    Autenticado = false,
                    Mensaje = "Usuario y contraseña son requeridos"
                };
            }

            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == login.Usuario);
            if (usuario == null)
            {
                return new LoginRespuesta
                {
                    Autenticado = false,
                    Mensaje = "Usuario no encontrado"
                };
            }

            try
            {
                if (!PasswordHelper.VerifyPassword(login.Clave, usuario.Contraseña))
                {
                    return new LoginRespuesta
                    {
                        Autenticado = false,
                        Mensaje = "Contraseña incorrecta"
                    };
                }

                return new LoginRespuesta
                {
                    Autenticado = true,
                    Usuario = usuario.NombreUsuario,
                    Perfil = usuario.NombreRol,
                    PaginaInicio = "/home",
                    Token = GenerarToken(usuario),
                    Mensaje = "Autenticación exitosa"
                };
            }
            catch (Exception ex)
            {
                return new LoginRespuesta
                {
                    Autenticado = false,
                    Mensaje = $"Error en autenticación: {ex.Message}"
                };
            }
        }

        private bool ValidarClave()
        {
            try
            {
                //Se consulta el usuario con la clave encriptada y el usuario para validar si existe
                Usuario usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == login.Usuario && u.Contraseña == login.Clave);
                if(usuario == null)
                {
                    //Si no existe la clave es incorrecta
                    LoginRespuesta.Autenticado = false;
                    LoginRespuesta.Mensaje = "La clave no coincide";
                    return false;
                }
                return true; // Return true if the user exists
            }
            catch(Exception ex)
            {
                LoginRespuesta.Autenticado = false;
                LoginRespuesta.Mensaje = ex.Message;
                return false;
            }
        }

        public IQueryable<LoginRespuesta> Ingresar(LoginModel login)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == login.Usuario);
            if (usuario != null && BCrypt.Net.BCrypt.Verify(login.Clave, usuario.Contraseña))
            {
                var rol = _context.Roles.FirstOrDefault(r => r.IdUsuario == usuario.IdUsuario);

                var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
                var tokenService = new TokenService(configuration);
                string token = tokenService.GenerateToken(usuario.NombreUsuario);

                var respuesta = new LoginRespuesta
                {
                    Usuario = usuario.NombreUsuario,
                    Autenticado = true,
                    Perfil = rol?.NombreRol ?? "Sin Rol",
                    PaginaInicio = "HomePage",
                    Token = token,
                    Mensaje = ""
                };
                return new List<LoginRespuesta> { respuesta }.AsQueryable();
            }
            else
            {
                return new List<LoginRespuesta>
                {
                    new LoginRespuesta
                    {
                        Autenticado = false,
                        Mensaje = "Usuario o clave incorrecta"
                    }
                }.AsQueryable();
            }
        }

        private string GenerarToken(Usuario usuario)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
    
            var tokenService = new TokenService(configuration);
            return tokenService.GenerateToken(usuario.NombreUsuario);
        }

    }
}