// Classe Notificacao (herança de Dashboard)
public class Notificacao : Dashboard {
    private string Mensagem;

    public string GetMensagem() {
        return Mensagem;
    }
    public void SetMensagem(string novaMensagem) {
        Mensagem = novaMensagem;
    }

    public Notificacao() { }

    public Notificacao(int id, string nome, string mensagem) : base(id, nome) {
        Mensagem = mensagem;
    }
}
