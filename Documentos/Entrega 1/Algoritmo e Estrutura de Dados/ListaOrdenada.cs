using System;
using System.Collections.Generic;
using System.Linq;

class Evento
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataFim { get; set; }
    public string Prioridade { get; set; }
    public string Status { get; set; }

    public Evento(int id, string nome, string descricao, string dataInicio, string dataFim, string prioridade, string status)
    {
        Id = id;
        Nome = nome;
        Descricao = descricao;
        DataInicio = DateTime.Parse(dataInicio);
        DataFim = DateTime.Parse(dataFim);
        Prioridade = prioridade;
        Status = status;
    }

    public override string ToString()
    {
        return $"{Nome} (Início: {DataInicio}, Fim: {DataFim})";
    }
}

class Program
{
    static Evento[] eventos;

    static void Main()
    {
        //inicializar array de eventos
        eventos = new Evento[]
        {
            new Evento(1, "Aula de História", "História moderna", "2025-03-10T10:00:00", "2025-03-10T12:00:00", "Média", "Pendentes"),
            new Evento(2, "Reunião de Planejamento", "Reunião com equipe pedagógica", "2025-03-09T08:30:00", "2025-03-09T10:00:00", "Alta", "Em andamento"),
            new Evento(3, "Aula de Matemática", "Matemática básica", "2025-03-11T14:00:00", "2025-03-11T16:00:00", "Baixa", "Pendentes"),
            new Evento(4, "Workshop de Física", "Física quântica", "2025-03-08T09:00:00", "2025-03-08T11:00:00", "Alta", "Concluído"),
            new Evento(5, "Seminário de Biologia", "Biologia celular", "2025-03-12T10:00:00", "2025-03-12T12:00:00", "Média", "Pendentes")
        };

        //mostrar lista de eventos antes da ordenação
        Console.WriteLine("Lista de eventos antes da ordenação:");
        foreach (var evento in eventos)
        {
            Console.WriteLine(evento);
        }

        //ordenando os eventos pela data de início
        Evento[] eventosOrdenados = QuickSort(eventos);

        //mostrar lista de eventos depois da ordenação
        Console.WriteLine("\nLista de eventos após a ordenação:");
        foreach (var evento in eventosOrdenados)
        {
            Console.WriteLine(evento);
        }
    }

    //função QuickSort para ordenar os eventos
    static Evento[] QuickSort(Evento[] eventos)
    {
        if (eventos.Length <= 1) return eventos; // Caso base

        //escolher um pivot
        var pivot = eventos[eventos.Length / 2];
        var left = eventos.Where(evento => evento.DataInicio < pivot.DataInicio).ToArray(); // Menores que o pivot
        var right = eventos.Where(evento => evento.DataInicio > pivot.DataInicio).ToArray(); // Maiores que o pivot
        var middle = eventos.Where(evento => evento.DataInicio == pivot.DataInicio).ToArray(); // Elementos iguais ao pivot

        //recursão
        return QuickSort(left).Concat(middle).Concat(QuickSort(right)).ToArray();
    }
}
