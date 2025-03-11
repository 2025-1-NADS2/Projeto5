const cursos = [
    { nome: "Design Gráfico", duracao: "6 meses" },
    { nome: "Desenvolvimento Web", duracao: "8 meses" },
    { nome: "Fotografia", duracao: "4 meses" }
];

console.log("Lista de cursos disponíveis:");
cursos.forEach(curso => {
    console.log(`Curso: ${curso.nome} - Duração: ${curso.duracao}`);
});
