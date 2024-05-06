using AplicacaoClientes.Domain.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AplicacaoClientes.Models
{
    public class ClientePaged
    {
        public List<Cliente> Clientes { get; set; }
        public int TotalRegistros { get; set; }
    }
}