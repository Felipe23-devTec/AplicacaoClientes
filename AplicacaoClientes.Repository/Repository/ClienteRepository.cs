using AplicacaoClientes.Domain.DML;
using AplicacaoClientes.Repository.Padrao;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Repository.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly IDataAcess _dataAcess;
        public ClienteRepository(IDataAcess dataAcess)
        {
            _dataAcess = dataAcess;
        }
        public List<Cliente> ConsultarClientes(string search, int start, int length)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            DataSet ds = _dataAcess.Consultar("SelectClientes", parametros);

            List<Cliente> clientes = new List<Cliente>();
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Cliente cli = new Cliente();
                cli.Nome = row.Field<string>("Nome");
                cli.Email = row.Field<string>("Email");
                cli.Sexo = row.Field<string>("Sexo");
                cli.Status = row.Field<bool>("Status");
                clientes.Add(cli);
            }


            return clientes;
        }
        //public ClientePaginado ConsultarClientesPaginado(string search, int start, int length)
        //{
        //    List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

        //    parametros.Add(new System.Data.SqlClient.SqlParameter("SearchTerm", search));
        //    parametros.Add(new System.Data.SqlClient.SqlParameter("PageSize", length));
        //    parametros.Add(new System.Data.SqlClient.SqlParameter("PageNumber", start));


        //    DataSet ds = _dataAcess.Consultar("BuscarClientesPaginado", parametros);


        //    List<Cliente> clientes = new List<Cliente>();


        //    foreach (DataRow row in ds.Tables[0].Rows)
        //    {
        //        Cliente cli = new Cliente();
        //        cli.Nome = row.Field<string>("Nome");
        //        cli.Email = row.Field<string>("Email");
        //        cli.Sexo = row.Field<string>("Sexo");
        //        cli.Status = row.Field<bool>("Status");
        //        clientes.Add(cli);
        //    }
        //    var totalClientes = (int)ds.Tables[0].Rows[0]["TotalClientes"];
        //    return new ClientePaginado { Clientes = clientes, TotalRegistros = totalClientes };
        //}
        public ClientePaginado ConsultarClientesPaginado(string search, int start, int length)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("@PageSize", length));
            parametros.Add(new SqlParameter("@PageNumber", start));
            parametros.Add(new SqlParameter("@SearchTerm", search));

            SqlParameter totalRecordsParam = new SqlParameter("@TotalRecords", SqlDbType.Int);
            totalRecordsParam.Direction = ParameterDirection.Output;
            parametros.Add(totalRecordsParam);

            DataSet ds = _dataAcess.Consultar("BuscarClientesPaginado", parametros);

            int totalRecords = Convert.ToInt32(totalRecordsParam.Value);

            List<Cliente> clientes = new List<Cliente>();
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Cliente cli = new Cliente();
                cli.Nome = row.Field<string>("Nome");
                cli.Email = row.Field<string>("Email");
                cli.Sexo = row.Field<string>("Sexo");
                cli.Status = row.Field<bool>("Status");
                clientes.Add(cli);
            }

            return new ClientePaginado { Clientes = clientes, TotalRegistros = totalRecords };
        }
    }
}
