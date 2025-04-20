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
    [Route("api/Login")]
    //[Authorize]: Directiva para obligar a que se tenga autorización usar al servicio
    //[AllowAnonymous]: Directiva para que se pueda usar el servicio sin autorización.
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        //Post Insertar
        [HttpPost]
        [Route("Ingresar")]

        public IQueryable<LoginRespuesta> Ingresar([FromBody] LoginModel login)
        {
            LoginService _login = new() { login = login };
            return _login.Ingresar(login);
        }

        [HttpPost]
        [Route("Validar")]
        public ActionResult<LoginRespuesta> Validar([FromBody] LoginModel login)
        {
            LoginService _login = new() { login = login };
            return _login.ValidarUsuario();           
        }
    


    }

}


