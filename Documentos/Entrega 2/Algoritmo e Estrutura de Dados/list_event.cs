using System;
using System.Collections.Generic;

public class Evento
{
    public string NomeEvento { get; set; }
    public string Segmento { get; set; }
    public string Descricao { get; set; }
    public string Local { get; set; }
    public DateTime Data { get; set; }
    public string Hora { get; set; }
    public string Empresa { get; set; }
    public string Organizadores { get; set; }

    public Evento(string nomeEvento, string segmento, string descricao, string local, DateTime data, string hora, string empresa, string organizadores)
    {
        NomeEvento = nomeEvento;
        Segmento = segmento;
        Descricao = descricao;
        Local = local;
        Data = data;
        Hora = hora;
        Empresa = empresa;
        Organizadores = organizadores;
    }

    public void ExibirDetalhes()
    {
        Console.WriteLine("Detalhes do Evento:");
        Console.WriteLine($"Nome do Evento: {NomeEvento}");
        Console.WriteLine($"Segmento: {Segmento}");
        Console.WriteLine($"Descrição: {Descricao}");
        Console.WriteLine($"Local: {Local}");
        Console.WriteLine($"Data: {Data.ToShortDateString()}");
        Console.WriteLine($"Hora: {Hora}");
        Console.WriteLine($"Empresa: {Empresa}");
        Console.WriteLine($"Organizadores: {Organizadores}");
    }
}

public class Program
{
    public static int BinarySearchEvento(List<Evento> eventos, string searchName)
    {
        int low = 0;
        int high = eventos.Count - 1;
        while (low <= high)
        {
            int mid = (low + high) / 2;
            int comparison = string.Compare(eventos[mid].NomeEvento, searchName, StringComparison.OrdinalIgnoreCase);
            if (comparison == 0)
            {
                return mid;
            }
            else if (comparison < 0)
            {
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void Main(string[] args)
    {
        List<Evento> eventos = new List<Evento>();

        eventos.Add(new Evento(
            "Oficina de Aprendizado Digital",
            "aprendizado",
            "Oficina destinada ao desenvolvimento de habilidades digitais para jovens.",
            "Sala 1 - Instituto Criativo",
            new DateTime(2023, 12, 05),
            "09:00",
            "Instituto Criativo",
            "Mariana e Pedro"));

        eventos.Add(new Evento(
            "Feira de Primeiro Emprego",
            "primeiro emprego",
            "Evento para conectar jovens com oportunidades de primeiro emprego.",
            "Centro de Convenções - Instituto Criativo",
            new DateTime(2023, 11, 15),
            "10:00",
            "Instituto Criativo",
            "Carlos e Ana"));

        eventos.Add(new Evento(
            "Seminário de Recolocação Profissional",
            "recolocação",
            "Seminário para orientar profissionais em transição de carreira.",
            "Auditório Principal - Instituto Criativo",
            new DateTime(2023, 10, 20),
            "14:00",
            "Instituto Criativo",
            "José e Laura"));

        eventos.Add(new Evento(
            "Sessão de Bem-Estar e Qualidade de Vida",
            "bem-estar",
            "Atividades e palestras que promovem o bem-estar físico e mental.",
            "Espaço Zen - Instituto Criativo",
            new DateTime(2023, 09, 30),
            "16:00",
            "Instituto Criativo",
            "Rita e Giovani"));

        for (int i = 0; i < eventos.Count - 1; i++)
        {
            for (int j = 0; j < eventos.Count - 1 - i; j++)
            {
                if (string.Compare(eventos[j].NomeEvento, eventos[j + 1].NomeEvento, StringComparison.OrdinalIgnoreCase) > 0)
                {
                    Evento temp = eventos[j];
                    eventos[j] = eventos[j + 1];
                    eventos[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("Lista de Eventos (Ordenada por Nome):");
        foreach (Evento ev in eventos)
        {
            Console.WriteLine($"{ev.NomeEvento} - {ev.Data.ToShortDateString()}  |  Segmento: {ev.Segmento}");
        }

        string criterioBusca = "Feira de Primeiro Emprego";
        int indexEncontrado = BinarySearchEvento(eventos, criterioBusca);

        if (indexEncontrado != -1)
        {
            Console.WriteLine("\nEvento encontrado:");
            eventos[indexEncontrado].ExibirDetalhes();
        }
        else
        {
            Console.WriteLine($"\nEvento com nome '{criterioBusca}' não foi encontrado.");
        }
    }
}
