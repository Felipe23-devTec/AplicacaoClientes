using log4net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AplicacaoClientes.Repository.Repository;
using AplicacaoClientes.Helpers;
using AplicacaoClientes.Services.Service.Contract;
using AplicacaoClientes.Models;
using AplicacaoClientes.Domain.DML;

namespace AplicacaoClientes.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IClienteService _clienteService;
        public HomeController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }
        public ActionResult Index()
        {

            log.Info("Mensagem de informação no método Index.");
            return View();
        }
        [HttpPost]
        public JsonResult Clientes(int start = 0, int length = 10)
        {
            var search = Request.Form["search[value]"].ToString();
            var jsonTable = Json(new DataTableResult());
            var clientes = _clienteService.ConsultarClientesPaginado(search,start, length);
            jsonTable = Json(new DataTableResult
            {
                data = clientes.Clientes,
                recordsTotal = clientes.TotalRegistros
            });

            return jsonTable;
        }
        [HttpPost]
        public ActionResult InserirCliente()
        {
            var model = new ModalClienteViewModel();
            return PartialView("ModalCliente", model);
        }
        [HttpPost]
        public ActionResult SalvarUsuario(ModalClienteViewModel model)
        { 
            if(ModelState.IsValid)
            {
                try
                {
                    Cliente c = new Cliente();
                    c.Nome = model.Nome;
                    c.Email = model.Email;
                    c.Sexo = "M";
                    _clienteService.InserirCliente(c);
                    return Json(new { status = "success" });
                }
                catch (Exception ex)
                {

                    return Json(new { status = "Erro" });
                }
            }
            else
            {
                return Json(new { status = "error", message = "Preenha todos os campos" });

            }
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            log.Error("Erro");
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}