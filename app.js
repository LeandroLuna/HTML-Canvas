const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); // Cria uma variavel com as propriedades de um quadro  2D
canvas.width = window.innerWidth; // Tamanho do quadro
canvas.height = window.innerHeight;
ctx.strokeStyle = 'BADA55'; // Cor do pincel
ctx.lineJoin = 'round'; // Arredonda o começo do pincel
ctx.lineCap = 'round'; // Arredonda a ponta do pincel
ctx.lineWidth = 1;
ctx.globalCompositeOperation = 'multiply'; // Composição das cores | sobreposições

let isDrawing = false; // Quando não estiver desenhando, atribuir false
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; // Para a execução da função quando o mouse não estiver clicado.
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Efeito de arco-íris
    ctx.beginPath(); // 'Memoriza' o caminho que será pintado
    ctx.moveTo(lastX, lastY); // Começa de:
    ctx.lineTo(e.offsetX, e.offsetY); // Termina em:
    ctx.stroke(); // Pinta a linha
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++; // Aumenta o 'nivel' da cor
    if (hue >= 360) {
        // Limita o nivel à 360
        hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        // Limita a espessura da linha da linha entre 1 e 100.
        direction = !direction; // Inverte a direção. Começa de maneira incremental, e quando chega a 100, começa declinar até 1.
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => (isDrawing = false)); // Quando soltar o botão do mouse, deixar a variavel isDrawing = false
canvas.addEventListener('mouseout', () => (isDrawing = false)); // Quando tirar o mouse da tela, deixar a variavel isDrawing = false