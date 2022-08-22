function comparador() { 
	return Math.random() - 0.5; 
}

const gifs = [
    {primeira:"./midias/bobrossparrot.gif",segunda:"./midias/bobrossparrot.gif"},
    {primeira:"./midias/explodyparrot.gif",segunda:"./midias/explodyparrot.gif"},
    {primeira:"./midias/fiestaparrot.gif",segunda:"./midias/fiestaparrot.gif"},
    {primeira:"./midias/metalparrot.gif",segunda:"./midias/metalparrot.gif"},
    {primeira:"./midias/revertitparrot.gif",segunda:"./midias/revertitparrot.gif"},
    {primeira:"./midias/tripletsparrot.gif",segunda:"./midias/tripletsparrot.gif"},
    {primeira:"./midias/unicornparrot.gif",segunda:"./midias/unicornparrot.gif"}]

let clicada = 0;
let pontuacao = 0;
let contador = 0;
let tempolevado = 0;
let denovo;

let n;
let m = 0;
let id;

let baralho;
let minhaArray = [];

function embaralhar(card){
    for(let k = 0; m > k; k++){
      card.push(gifs[k].primeira);
      card.push(gifs[k].segunda);
    }
    card.sort(comparador);
}

function relogio(){
    contador = document.querySelector('.contador');
    contador.innerHTML++;
    tempolevado = contador.innerHTML;
}

function distribuircartas(){
    n = Number(prompt("Quantas cartas quer começar a jogar?"))
    id = setInterval(relogio,1000);
    

    while (n < 4 || n > 14){
        n = Number(prompt("Por favor, digite um número entre 4 e 14! Quantas cartas você quer começar?"));
    }

    if ((n > 4 || n < 14) && (n % 2 === 1)){
        n = n + 1;
    }

    embaralhar(gifs);
    m = n/2;
    embaralhar(minhaArray);

    for (let i = 0; n > i; i++){

        baralho = document.querySelector('ul');

        const carta = `
        <li onclick="selecionar(this)">
            <div class="frente carta">
                <img src="./midias/front 1.png">
            </div>
            <div class="costas carta">
                <img src ="${minhaArray[i]}"/>
            </div>
        </li>`;

        baralho.innerHTML = baralho.innerHTML + carta;
    }
    minhaArray = [];
}

distribuircartas();

let possuiclasse;
let primeiraselecionada = '';
let segundaselecionada = '';
let primeirafrente = '';
let primeiracostas = '';
let segundafrente = '';
let segundacostas = '';

function selecionar(carta){
    clicada++;
    const frente = carta.querySelector('.frente');
    const costas = carta.querySelector('.costas');
    
    const primeira = document.querySelector('li .selecionada');

    if (primeira === null){  
        frente.classList.add('selecionada');
        costas.classList.add('selecionada');
        primeiraselecionada = carta;
        primeirafrente = frente;
        primeiracostas = costas;
    }
    
    else if (primeiraselecionada === carta){
        alert("Você já escolheu essa!");
    }
    
    else{
        frente.classList.add('selecionada');
        costas.classList.add('selecionada');
        segundafrente = frente;
        segundacostas = costas;
        
        pontuar();
    }
}

function desmarcar(){
    primeirafrente.classList.remove('selecionada');
    primeiracostas.classList.remove('selecionada');
    segundafrente.classList.remove('selecionada');
    segundacostas.classList.remove('selecionada');
}

function pontuar(){
    if (primeiracostas.innerHTML === segundacostas.innerHTML){
        pontuacao++;

        primeirafrente.classList.remove('selecionada');
        primeiracostas.classList.remove('selecionada');
        segundafrente.classList.remove('selecionada');
        segundacostas.classList.remove('selecionada');

        primeirafrente.classList.add('pontuada');
        primeiracostas.classList.add('pontuada');
        segundafrente.classList.add('pontuada');
        segundacostas.classList.add('pontuada');

        const pai1 = primeiracostas.parentNode;
        const pai2 = segundacostas.parentNode;
        pai1.removeAttribute("onclick");
        pai2.removeAttribute("onclick");
    }else{
        setTimeout(desmarcar,1000);
    }

    avaliacao();
}

function avaliacao(){
    if (pontuacao === m){
        clearInterval(id);

        const corpo = document.querySelector('body');
        const item = `
        <div class="fundo">
            <div class="aviso">
                <div class="cima">
                    <img class="direita" src="./midias/front 1.png">
                    <h1>PARABÉNS!</h1>
                    <img class="esquerda" src="./midias/front 1.png">
                </div>
                <div class="baixo">
                    <h2>
                        Você conseguiu terminar o jogo <br>
                        em ${tempolevado} segundos e ${clicada} jogadas.
                        <br>
                        Se quiser jogar novamente, digite "sim"!
                        <br>
                        Caso queria jogar depois, recarregue a página.
                    </h2>
                </div>
            </div>
        </div>`;

        corpo.innerHTML = corpo.innerHTML + item;

        setTimeout(repetir,5000);
    }
}

function repetir(){
    denovo = prompt("Quer jogar novamente?");

    if (denovo === "sim"){
        document.location.reload(true);
    }
}