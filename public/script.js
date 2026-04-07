import { response } from "express";

document.addEventListener('DOMcontentLoaded', ()=>{

    const botaoAdicionar = document.getElementById('adicionar-produto');

    const botaoSalvar = document.getElementById('salvar-pedidos');

    const listaPedidos = document.getElementById('lista-pedidos');

    const totalElemento = document.getElementById('total');

    const nomeProdutoInput = document.getElementById('nome-produto');

    const PrecoProdutoInput = document.getElementById('preco-produto');

    let total = 0;

    
    let pedidosData = [];

    botaoAdicionar.addEventListener('click', function(){
        const nomeProduto = nomeProdutoInput.value.trim();
        const precoProduto = parseFloat(PrecoProdutoInput.value);

        if(nomeProduto && !isNaN(precoProduto) && precoProduto > 0){

        const li = document.createElement('li');
        li.innerHTML = `
            ${nomeProduto} - R$ {precoProduto.toFixed(2).replace(
            '.',',' )}

            <button class = "remover"> Remover </button>
           
        `;
        listaPedidos.appendChild(li);

        total += precoProduto
        totalElemento.textContent = total.toFixed(2).replace(
            '.',',')

        }
        pedidosData.push({
            nome: nomeProduto,
            preco : precoProduto
        })
        
        nomeProdutoInput.value = "";
        PrecoProdutoInput.value = "";

        li.querySelector('.remover').addEventListener('click', function(){

            const preco =
             parseFloat(
                this.parentElement.textContent.split(' - R$')[1]
                .replace(',','.'))

                total -= preco;
                totalElemento.textContent = total.toFixed(2).replace('.',',')
            
                pedidosData = pedidosData.filter(p =>(
                    p.nomeProduto === nomeProduto && p.preco === precoProduto));
                     listaPedidos.removeChild(li);

        })
        botaoSalvar.addEventListener('click', function(){
            if(pedidosData.length === 0 ){
                alert('nenhum produto para salvar');
                return;
            }
            const dadosParaSalvar = {
                pedidos: pedidosData,
                total: total.toFixed(2)
            }
            fetch('http://localhost:3000/salvar',{
                method: "POST",
                Headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dadosParaSalvar)

            }).then(response => response.text())
            .then(resposta => {
                alert(resposta)
            })
            .catch(error('erro ao salvar dados', error))
        })

        document.getElementById('lista-pedidos').innerHTML = ""
         document.getElementById('total').innerHTML = ""

        
    
        

        
    })

























});