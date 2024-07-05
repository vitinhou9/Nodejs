//constantes e variaveis
const readline= require("readline");
const fs = require("fs");
const {EventEmitter} = require('events');
const leitor = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
const emitter = new EventEmitter();

//funçoes
function executarPrograma(){
leitor.question("Insira o caminho do arquivo: ",(resposta)=>{
   const startTime=Date.now();
   
        fs.readFile(resposta,"utf8",(err,data)=>{
                if(err){
                    console.error(err);
                    leitor.close();
                    return;
                }
                else{
                    const lines = data.split(/\r?\n/);
                    let soma = 0;
                    let linhasComTexto = 0;
                    let contagemLinhas = 0;

                    lines.forEach(line =>{
                        if (/^\d+$/.test(line)){
                            soma+= parseInt(line, 10);
                            contagemLinhas ++;
                        }
                        else if(line.trim()){
                        linhasComTexto++;   
                        }
                    });
                  const endTime = Date.now();
                  const tempoExecucao= endTime - startTime;
               emitter.emit('summary', {soma,linhasComTexto,tempoExecucao});
        }}) ; 
    
});
};
function executarNovamente(){
    console.clear();
    leitor.question('Deseja executar novamente? (s/n) ',(resposta) => {
        if(resposta.toLowerCase() === 's') {
            executarPrograma();
        }
        else {
            leitor.close();
        }
    });
}
emitter.on('summary', ({soma,linhasComTexto,tempoExecucao}) => {
    console.log(`Soma dos numeros: ${soma}`);
    console.log(`Numero de Linhas com texto: ${linhasComTexto}`);
    console.log(`Tempo de execuçao: ${tempoExecucao}ms`);
    setTimeout(()=>executarNovamente(),4000)}
);
    executarPrograma();
   