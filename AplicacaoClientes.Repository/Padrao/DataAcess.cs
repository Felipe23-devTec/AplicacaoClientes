using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AplicacaoClientes.Repository.Padrao
{
    public class DataAcess : IDataAcess
    {
        private string stringDeConexao
        {
            get
            {
                ConnectionStringSettings conn = System.Configuration.ConfigurationManager.ConnectionStrings["BancoDeDados"];
                if (conn != null)
                    return conn.ConnectionString;
                else
                    return string.Empty;
            }
        }

        public DataSet Consultar(string NomeProcedure, List<SqlParameter> parametros)
        {
            SqlCommand comando = new SqlCommand();
            SqlConnection conexao = new SqlConnection(stringDeConexao);
            
            conexao.Open();
            DataSet ds = new DataSet();

            try
            {
                comando.Connection = conexao;
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.CommandText = NomeProcedure;

                SqlDataAdapter adapter = new SqlDataAdapter(comando);

                adapter.Fill(ds);

            }
            finally
            {
                conexao.Close();
            }

            return ds;
        }
    }
}
