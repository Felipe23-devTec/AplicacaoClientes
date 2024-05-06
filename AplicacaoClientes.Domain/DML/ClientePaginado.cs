using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Domain.DML
{
    public class ClientePaginado
    {
        public List<Cliente> Clientes { get; set; }
        public int TotalRegistros { get; set; }
    }
}
