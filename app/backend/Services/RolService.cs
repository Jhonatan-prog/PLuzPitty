using System;
using System.Collections.Generic;
using app.backend.App_Data;
using app.backend.Models;
using System.Linq;
using BCrypt.Net;

namespace app.backend.Services
{
    public class RolService
    {
        private MiContextoDeDatos _context = new MiContextoDeDatos();
        public Rol rol{get;set;}

        public string Insertar()
        {
            try
            {
                _context.Roles.Add(rol);
                _context.SaveChanges();
                return "Usuario Insertado Correctamente";
            }
            catch (Exception ex)
            {
                return "Error al Insertar el Rol: " + ex.Message;
            }
        }

        public string ActualizarRol()
        {
            try
            {
                //Antes de actualizar vemos si Existe
                Rol rols = Consultar(rol.id_rol);
                if(rols == null)
                {
                    return "El rol no existe";
                }
                // Desconectamos la entidad actual antes de actualizar
                _context.Entry(rols).State = Microsoft.EntityFrameworkCore.EntityState.Detached;

                //Actualizamos
                _context.Roles.Update(rol);
                _context.SaveChanges();
                return "Rol Actualizado Correctamente";
            }
            catch(Exception ex)
            {
                return "Error al Actualizar Rol: " + ex.Message;
            } 
        }

        public bool Validar(int id_rol)
        {
            if(Consultar(id_rol) == null)
            {
                return false;
            }
            else{
                return true;
            }

        }

        public Rol Consultar(int id_rol)
        {
            return _context.Roles.FirstOrDefault(R => R.id_rol == id_rol);
        }

        public string Eliminar()
        {
            try
            {
                //Antes de Eliminar verificamos si existe
                Rol rols = Consultar(rol.id_rol);
                if(rols == null)
                {
                    return "El rol no existe";
                }
                // Si Elimina el Rol
                _context.Roles.Remove(rols);
                _context.SaveChanges();
                return "Rol Eliminado Correctamente";
            }
            catch(Exception ex)
            {
                return "Error al Eliminar Rol: " +ex.Message;
            }
        }

        //Eliminar Por ID
        public string EliminarXID(int id_rol)
        {
            try
            {
                //Antes de Eliminar verificamos si existe
                Rol rols = Consultar(rol.id_rol);
                if(rols == null)
                {
                    return "El rol no existe";
                }
                // Si Elimina el Rol
                _context.Roles.Remove(rols);
                _context.SaveChanges();
                return "Rol Eliminado Correctamente";
            }
            catch(Exception ex)
            {
                return "Error al Eliminar Rol: " +ex.Message;
            }
        }

        public List<Rol> ConsultarTodos()
        {
            return _context.Roles.ToList();
        }
    }
}