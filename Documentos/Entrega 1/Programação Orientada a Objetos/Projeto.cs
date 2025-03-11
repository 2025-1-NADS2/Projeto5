//classe Projeto (herança de Dashboard)
public class Projeto : Dashboard {
    private string Descricao;
    private string DataInicio;
    private string DataFim;

    public string GetDescricao() {
        return Descricao;
    }
    public void SetDescricao(string novaDescricao) {
        Descricao = novaDescricao;
    }

    public string GetDataInicio() {
        return DataInicio;
    }
    public void SetDataInicio(string novaDataInicio) {
        DataInicio = novaDataInicio;
    }

    public string GetDataFim() {
        return DataFim;
    }
    public void SetDataFim(string novaDataFim) {
        DataFim = novaDataFim;
    }

    public Projeto() { }

    public Projeto(int id, string nome, string descricao, string dataInicio, string dataFim) : base(id, nome) {
        Descricao = descricao;
        DataInicio = dataInicio;
        DataFim = dataFim;
    }
}
