using System;
using System.Collections.Generic;
using app.backend.App_Data;
using app.backend.Models;
using System.Linq;


namespace app.backend.Services
{
    public class ProductoService
    {
        private MiContextoDeDatos _context = new MiContextoDeDatos();
        public Producto producto {get;set;}

        //Insertar un prodcuto
        public string InsertarProducto()
        {
            try
            {
                _context.Productos.Add(producto);
                _context.SaveChanges();
                return "Producto Insertado Correctamente";
            }
            catch (Exception ex)
            {
                return "Error al Insertar el Producto" + ex.Message;
            }   
        }

        //Actualizar un producto
        public string ActualizarProdcuto()
        {
            try
            {
                 //Antes de actualizar vemos si Existe
                 Producto produc = Consultar(producto.Id_Producto);
                if(produc == null)
                {
                    return "El prodcuto no Existe";
                }
                // Desconectamos la entidad actual antes de actualizar
                _context.Entry(produc).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
        
                 // Ahora actualizamos con la nueva entidad
                 _context.Productos.Update(producto); 
                _context.SaveChanges();
                return "Producto Actualizado Correctamente";

            }
            catch (Exception ex)
            {
                return "Erro al Actualizar Prodcuto  " + ex.Message;
            }
        }

        private bool Validar(int Id_Producto)
        {
            if(Consultar(Id_Producto) == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        //Consultar un producto por id
        public Producto Consultar(int Id_Producto)
        {
            return _context.Productos.FirstOrDefault(p => p.Id_Producto == Id_Producto);
        }

        //Eliminar Producto
        public string Eliminar()
        {
            //Primero se consulta
            try
            {
                Producto product = Consultar(producto.Id_Producto);
                if(product == null)
                {
                    return "El producto no Existe";
                }
                //si el empleado existe se elimina
                _context.Productos.Remove(producto);
                _context.SaveChanges();
                return "Producto Eliminado Correctamente";
            }
            catch (Exception ex)
            {
                return "Error al Eliminar Producto" + ex.Message;
            }

           
        }

        //Eliminar Poducto X ID
        public string EliminarXId(int Id_Producto)
        {
            try
            {
                Producto product = Consultar(Id_Producto);
                if(product == null)
                {
                    return "El producto no Existe";
                }
                //si el empleado existe se elimina
                _context.Productos.Remove(product);
                _context.SaveChanges();
                return "Producto Eliminado Correctamente";
            }
            catch (Exception ex)
            {
                return "Error al Eliminar Producto" + ex.Message;
            }
        }
         
        //Listar Productos
        public List<Producto> ConsultarTodos()
        {
            return _context.Productos
            //.OrderBy(p => p.Nombre)
            .ToList();
        }

        
    }
}