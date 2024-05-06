using AplicacaoClientes.Domain.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Repository.Repository
{
    public interface IClienteRepository
    {
        List<Cliente> ConsultarClientes(string search, int start, int length);
        ClientePaginado ConsultarClientesPaginado(string search, int start, int length);
    }
}
