using AplicacaoClientes.Domain.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Services.Service.Contract
{
    public interface IClienteService
    {
        ClientePaginado ConsultarClientesPaginado(string search, int start, int length);
        string InserirCliente(Cliente cliente);
    }
}
