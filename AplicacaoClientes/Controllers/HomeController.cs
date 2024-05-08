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