//classe principal
public class Dashboard {
    private int Id;
    private string Nome;

    public int GetId() {
        return Id;
    }
    public void SetId(int novoId) {
        Id = novoId;
    }

    public string GetNome() {
        return Nome;
    }
    public void SetNome(string novoNome) {
        Nome = novoNome;
    }

    public Dashboard() { }

    public Dashboard(int id) {
        Id = id;
        Nome = "Sem nome";
    }

    public Dashboard(int id, string nome) {
        Id = id;
        Nome = nome;
    }

    public string ExibirNome() {
        return Nome;
    }
}
