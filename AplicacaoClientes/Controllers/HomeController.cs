using log4net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AplicacaoClientes.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ActionResult Index()
        {
            ConnectionStringSettings conn = System.Configuration.ConfigurationManager.ConnectionStrings["BancoDeDados"];
            
            SqlCommand comando = new SqlCommand();
            SqlConnection conexao = new SqlConnection(conn.ConnectionString);

            conexao.Open();
            try
            {
                comando.Connection = conexao;
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.CommandText = "SelectClientes";

                SqlDataAdapter adapter = new SqlDataAdapter(comando);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);

                // Exiba os resultados
                foreach (DataRow row in dataTable.Rows)
                {
                    Console.WriteLine(row["Nome"]);
                    Console.WriteLine(row["IdPedido"]);
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally { conexao.Close(); }
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