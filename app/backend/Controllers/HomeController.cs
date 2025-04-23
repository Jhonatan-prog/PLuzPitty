using app.backend.Services;
using app.backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace app.backend.Controllers
{
    [ApiController]
    [Route("api/")]
    //[Authorize]: Directiva para obligar a que se tenga autorización usar al servicio
    //[AllowAnonymous]: Directiva para que se pueda usar el servicio sin autorización.
    [AllowAnonymous]
    public class HomeController : ControllerBase
    {
        //Post Insertar
        [HttpGet]
        [Route("/")]
        public string Home()
        {
            return "Bienvenido a la API de la Tienda Virtual";
        }
    }
}