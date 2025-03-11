//classe Evento (herança de Dashboard)
public class Evento : Dashboard {
    private string Local;
    private string Descricao;
    private string DataEvento;
    private string Status;

    public string GetLocal() {
        return Local;
    }
    public void SetLocal(string novoLocal) {
        Local = novoLocal;
    }

    public string GetDescricao() {
        return Descricao;
    }
    public void SetDescricao(string novaDescricao) {
        Descricao = novaDescricao;
    }

    public string GetDataEvento() {
        return DataEvento;
    }
    public void SetDataEvento(string novaData) {
        DataEvento = novaData;
    }

    public string GetStatus() {
        return Status;
    }
    public void SetStatus(string novoStatus) {
        Status = novoStatus;
    }

    public Evento() { }

    public Evento(int id, string nome) : base(id, nome) {
        Local = "Local indefinido";
        Descricao = "Sem descrição";
        DataEvento = "Data não definida";
        Status = "Indefinido";
    }

    public Evento(int id, string nome, string local, string descricao, string dataEvento, string status) : base(id, nome) {
        Local = local;
        Descricao = descricao;
        DataEvento = dataEvento;
        Status = status;
    }
}
