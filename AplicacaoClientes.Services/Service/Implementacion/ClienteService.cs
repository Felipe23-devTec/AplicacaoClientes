using AplicacaoClientes.Domain.DML;
using AplicacaoClientes.Repository.Repository;
using AplicacaoClientes.Services.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Services.Service.Implementacion
{
    
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;
        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }
        public ClientePaginado ConsultarClientesPaginado(string search, int start, int length)
        {
           var clientes = _clienteRepository.ConsultarClientesPaginado(search, start, length);

            return clientes;
        }

        public string InserirCliente(Cliente cliente)
        {
            var msg = _clienteRepository.InserirCliente(cliente);
            return msg;
        }
    }
}
