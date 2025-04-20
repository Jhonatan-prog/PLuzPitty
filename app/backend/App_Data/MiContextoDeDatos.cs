using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using app.backend.Models;

namespace app.backend.App_Data
{
     public class MiContextoDeDatos : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=PLuzPitty;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configura TPT para cada tipo derivado, para que las tablas herencia se creen en la BD
            modelBuilder.Entity<Cliente>().ToTable("Clientes");
            modelBuilder.Entity<Empleado>().ToTable("Empleados");
            modelBuilder.Entity<Venta>().ToTable("Ventas");
            modelBuilder.Entity<Devolucion>().ToTable("Devoluciones");

             // LoginModel sin clave primaria ni tabla
            modelBuilder.Entity<LoginModel>().HasNoKey();
            modelBuilder.Entity<LoginRespuesta>().HasNoKey();
            modelBuilder.Entity<Facturacion>()
            
            .HasOne(f => f.Cliente)
            .WithMany()
            .HasForeignKey(f => f.ClienteId)
            .OnDelete(DeleteBehavior.Restrict); // Desactiva cascada

            modelBuilder.Entity<Facturacion>()
            .HasOne(f => f.Usuario)
            .WithMany()
            .HasForeignKey(f => f.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade); // Solo una relación en cascada

            modelBuilder.Entity<Devolucion>()
            .HasOne(d => d.VentaAsociada)
            .WithMany(v => v.Devoluciones)
            .HasForeignKey(d => d.VentaId)
            .OnDelete(DeleteBehavior.Restrict); // o Cascade, según tu caso






        }

        // Define los DbSets aquí para las operaciones CRUD sobre las entidades
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Devolucion> Devoluciones { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Facturacion> Facturacions { get; set; }
        public DbSet<Inventario> Inventarios { get; set; }
        public DbSet<Permiso> Permisos { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Transaccion> Transaccions { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<LoginModel> LoginModels { get; set; }
        public DbSet<LoginRespuesta> LoginRespuestas { get; set; }

    }
}

