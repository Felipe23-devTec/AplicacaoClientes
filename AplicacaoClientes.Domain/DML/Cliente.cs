using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacaoClientes.Domain.DML
{
    public class Cliente
    {
        public string Nome { get; set; }
        public string Email { get; set;}
        public char Sexo { get; set; }
        public bool Status { get; set; }
    }
}
