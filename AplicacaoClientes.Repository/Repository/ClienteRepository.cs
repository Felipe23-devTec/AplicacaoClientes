using AplicacaoClientes.Domain.DML;
using AplicacaoClientes.Repository.Padrao;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Repository.Repository
{
    public class ClienteRepository : DataAcess
    {
        public List<Cliente> ConsultarClientes()
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            DataSet ds = base.Consultar("SelectClientes", parametros);

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
    }
}
