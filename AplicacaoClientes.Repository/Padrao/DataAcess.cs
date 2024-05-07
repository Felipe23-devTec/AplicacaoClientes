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
            if(parametros.Count > 0)
            {
                foreach (var item in parametros)
                    
                    comando.Parameters.Add(item);
                    
                    
            }
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

        public int ConsultarQtd(string NomeProcedure, List<SqlParameter> parametros)
        {
            SqlCommand comando = new SqlCommand();
            SqlConnection conexao = new SqlConnection(stringDeConexao);
            try
            {
                
                if (parametros.Count > 0)
                {
                    foreach (var item in parametros)
                        comando.Parameters.Add(item);
                }
                comando.Connection = conexao;
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.CommandText = NomeProcedure;
                conexao.Open();

                int quantidade = (int)comando.ExecuteScalar();
                return quantidade;
            }
            finally
            {
                conexao.Close();
            }
        }
    }
}
