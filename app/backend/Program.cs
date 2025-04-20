using Microsoft.AspNetCore.Builder; // Importa el espacio de nombres necesario para construir y configurar la aplicación web.
using Microsoft.Extensions.DependencyInjection; // Importa el espacio de nombres necesario para configurar los servicios de la aplicación.
using Microsoft.Extensions.Hosting; // Importa el espacio de nombres necesario para trabajar con diferentes entornos (desarrollo, producción, etc.).
using app.backend.Services; // Importa el espacio de nombres donde se encuentran los servicios personalizados de la aplicación.

var builder = WebApplication.CreateBuilder(args); // Crea un constructor para configurar la aplicación web ASP.NET Core.

builder.Services.AddControllers(); // Agrega soporte para controladores MVC, permitiendo manejar solicitudes HTTP a través de acciones en los controladores.
builder.Services.AddHttpContextAccessor();


builder.Services.AddCors(options => // Configura CORS (Cross-Origin Resource Sharing) para la aplicación.
{
    options.AddPolicy("AllowAllOrigins", // Define una política de CORS llamada "AllowAllOrigins".
        builder => builder.AllowAnyOrigin() // Permite solicitudes desde cualquier origen (dominio).
                          .AllowAnyMethod() // Permite cualquier método HTTP (GET, POST, etc.).
                          .AllowAnyHeader()); // Permite cualquier encabezado en las solicitudes.
});

var app = builder.Build(); // Construye la aplicación con las configuraciones especificadas anteriormente.

if (app.Environment.IsDevelopment()) // Verifica si la aplicación está en el entorno de desarrollo.
{
    app.UseDeveloperExceptionPage(); // Habilita una página de excepción detallada, útil para depurar errores durante el desarrollo.
}

app.UseHttpsRedirection(); // Fuerza la redirección de las solicitudes HTTP a HTTPS para mejorar la seguridad.

app.UseRouting();

app.UseCors("AllowAllOrigins"); // Aplica la política de CORS que permite solicitudes desde cualquier origen.

app.UseAuthorization(); // Habilita el middleware de autorización, necesario para proteger rutas que requieren autenticación o autorización.

app.MapControllers(); // Configura las rutas de los controladores para manejar las solicitudes HTTP.

app.Run(); // Inicia la aplicación y comienza a escuchar las solicitudes entrantes.

