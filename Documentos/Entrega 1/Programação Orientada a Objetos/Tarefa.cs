//classe Tarefa (herança de Dashboard)
public class Tarefa : Dashboard {
    private string Descricao;
    private string DataConclusao;
    private string Status;

    public string GetDescricao() {
        return Descricao;
    }
    public void SetDescricao(string novaDescricao) {
        Descricao = novaDescricao;
    }

    public string GetDataConclusao() {
        return DataConclusao;
    }
    public void SetDataConclusao(string novaDataConclusao) {
        DataConclusao = novaDataConclusao;
    }

    public string GetStatus() {
        return Status;
    }
    public void SetStatus(string novoStatus) {
        Status = novoStatus;
    }

    public Tarefa() { }

    public Tarefa(int id, string nome, string descricao, string dataConclusao, string status) : base(id, nome) {
        Descricao = descricao;
        DataConclusao = dataConclusao;
        Status = status;
    }
}
