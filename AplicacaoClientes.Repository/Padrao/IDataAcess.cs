using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Repository.Padrao
{
    public interface IDataAcess
    {
        DataSet Consultar(string NomeProcedure, List<SqlParameter> parametros);

        int ConsultarQtd(string NomeProcedure, List<SqlParameter> parametros);
    }
}
