//Ele especifica que os campos que objetos do tipo artistas deverão ter.
class Artista {
    constructor(codigo, nome, genero_musical, pais_origem) {
        this.codigo = codigo;
        this.nome = nome;
        this.genero_musical = genero_musical;
        this.pais_origem = pais_origem;
    }
}

module.exports = Artista;