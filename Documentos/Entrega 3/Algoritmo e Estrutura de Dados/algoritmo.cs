using System;
using System.Collections.Generic;
using System.Linq;

public class Registro
{
    public int Id { get; set; }
    public string Tipo { get; set; }
    public int Quantidade { get; set; }
    public string Status { get; set; }
    public DateTime DataCriacao { get; set; }
    public string Descricao { get; set; }
}
public class Buscador
{
    public Registro BuscarPorTipoEQuantidade(List<Registro> registros, int quantidadeMin, int quantidadeMax, string tipo)
    {
        return registros
            .Where(r => r.Quantidade >= quantidadeMin && r.Quantidade <= quantidadeMax && r.Tipo.Equals(tipo, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(r => r.DataCriacao)
            .FirstOrDefault();
    }

    public List<Registro> BuscarTodosPorTipo(List<Registro> registros, string tipo)
    {
        return registros
            .Where(r => r.Tipo.Equals(tipo, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(r => r.DataCriacao)
            .ToList();
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        List<Registro> registros = new List<Registro>
        {
            new Registro { Id = 1, Tipo = "Doacao", Quantidade = 500, Status = "Confirmado", DataCriacao = DateTime.Now.AddDays(-3), Descricao = "Doação de alimentos" },
            new Registro { Id = 2, Tipo = "Evento", Quantidade = 300, Status = "Planejado", DataCriacao = DateTime.Now.AddDays(-10), Descricao = "Evento comunitário" },
            new Registro { Id = 3, Tipo = "Voluntario", Quantidade = 150, Status = "Ativo", DataCriacao = DateTime.Now.AddDays(-7), Descricao = "Recrutamento de voluntários" },
            new Registro { Id = 4, Tipo = "Doacao", Quantidade = 1000, Status = "Confirmado", DataCriacao = DateTime.Now.AddDays(-1), Descricao = "Grande doação de roupas" },
            new Registro { Id = 5, Tipo = "Evento", Quantidade = 200, Status = "Concluido", DataCriacao = DateTime.Now.AddDays(-5), Descricao = "Oficina de artes" }
        };

        Buscador buscador = new Buscador();
        Registro resultado = buscador.BuscarPorTipoEQuantidade(registros, 100, 600, "Doacao");

        if (resultado != null)
        {
            Console.WriteLine($"Registro encontrado: Tipo={resultado.Tipo}, Quantidade={resultado.Quantidade}, Status={resultado.Status}, Descricao={resultado.Descricao}, DataCriacao={resultado.DataCriacao}");
        }
        else
        {
            Console.WriteLine("Nenhum registro encontrado com as condições fornecidas.");
        }

        Console.WriteLine("\nTodos os registros do tipo 'Evento':");
        foreach (var reg in buscador.BuscarTodosPorTipo(registros, "Evento"))
        {
            Console.WriteLine($"Tipo={reg.Tipo}, Quantidade={reg.Quantidade}, Status={reg.Status}, Descricao={reg.Descricao}, DataCriacao={reg.DataCriacao}");
        }
    }
}
