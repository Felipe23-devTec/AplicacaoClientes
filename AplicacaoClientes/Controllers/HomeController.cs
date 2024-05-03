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

namespace AplicacaoClientes.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IClienteRepository _clienteRepository;
        public HomeController(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }
        public ActionResult Index()
        {
       
            var clientes = _clienteRepository.ConsultarClientes();

            log.Info("Mensagem de informação no método Index.");
            return View();
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