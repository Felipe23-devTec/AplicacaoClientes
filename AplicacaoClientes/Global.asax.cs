using AplicacaoClientes.Repository.Padrao;
using AplicacaoClientes.Repository.Repository;
using SimpleInjector;
using SimpleInjector.Integration.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Xml.Linq;

namespace AplicacaoClientes
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            // Configuração do log4net
            log4net.Config.XmlConfigurator.Configure();

            var container = new Container();
            // Configure a injeção de dependência

            container.Register<IDataAcess, DataAcess>();
            container.Register<IClienteRepository, ClienteRepository>();

            
            // Registre os controllers do MVC
            container.RegisterMvcControllers(Assembly.GetExecutingAssembly());

            // Set the dependency resolver to be Simple Injector.
            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));




        }
    }
}
