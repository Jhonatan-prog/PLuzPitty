using System;
using System.Collections.Generic;
using app.backend.App_Data;
using app.backend.Models;
using System.Linq;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace app.backend.Services
{
    public class UsuarioService
    {
        private MiContextoDeDatos _context = new MiContextoDeDatos();
        public Usuario usuario { get; set; }

       
        public string CrearUsuario()
        {
            try
            {
                if (string.IsNullOrWhiteSpace(usuario.Contraseña))
                return "La contraseña no puede estar vacía";
                
                usuario.Contraseña = PasswordHelper.HashPassword(usuario.Contraseña);
                _context.Usuarios.Add(usuario);
                _context.SaveChanges();
                return "Usuario creado exitosamente.";
            }
            catch (Exception ex)
            {
                return $"Error al crear usuario: {ex.Message}";
            }
        }

        public string ActualizarUsuario()
        {
            try
            {
                var usuarioExistente = Consultar(usuario.IdUsuario);
                if (usuarioExistente == null)
                return "El usuario no existe";

                // Solo actualiza la contraseña si se proporcionó una nueva
                if (!string.IsNullOrWhiteSpace(usuario.Contraseña) && 
                    usuario.Contraseña != usuarioExistente.Contraseña)
                {
                    usuario.Contraseña = PasswordHelper.HashPassword(usuario.Contraseña);
                }
                else
                {
                    // Mantiene la contraseña existente
                    usuario.Contraseña = usuarioExistente.Contraseña;
                }

                _context.Entry(usuarioExistente).State = EntityState.Detached;
                _context.Usuarios.Update(usuario);
                _context.SaveChanges();
                return "Usuario actualizado correctamente";
            }
            catch (Exception ex)
            {
                return $"Error al actualizar usuario: {ex.Message}";
            }
        }

        private bool Validar(int IdUsuario)
        {
            if(Consultar(IdUsuario) == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        //Consultar un usuario por id
        public Usuario Consultar(int IdUsuario)
        {
            return _context.Usuarios.FirstOrDefault(u => u.IdUsuario == IdUsuario);
        }

        //Eliminar Producto
        public string Eliminar()
        {
            //Primero se consulta
            try
            {
                Usuario product = Consultar(usuario.IdUsuario);
                if(product == null)
                {
                    return "El Usuario no Existe";
                }
                //si el empleado existe se elimina
                _context.Usuarios.Remove(usuario);
                _context.SaveChanges();
                return "Usuario Eliminado Correctamente";
            }
            catch (Exception ex)
            {
                return "Error al Eliminar Usuario" + ex.Message;
            }

           
        }

        //Eliminar Poducto X ID
        public string EliminarXId(int IdUsuario)
        {
            try
            {
                Usuario usua = Consultar(IdUsuario);
                if(usua == null)
                {
                    return "El Usuario no Existe";
                }
                //si el empleado existe se elimina
                _context.Usuarios.Remove(usua);
                _context.SaveChanges();
                return "Usuario Eliminado Correctamente";
            }
            catch (Exception ex)
            {
                return "Error al Eliminar Usuario" + ex.Message + "-Inner " + ex.InnerException?.Message;
            }
        }
         
        //Listar Productos
        public List<Usuario> ConsultarTodos()
        {
            return _context.Usuarios
            //.OrderBy(p => p.Nombre)
            .ToList();
        }
    }
}