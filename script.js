const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sProduto = document.querySelector('#m-produto');
const sQuantidade = document.querySelector('#m-quantidade');
const sPrecoEsperado = document.querySelector('#m-preço-esperado');
const sDetalhe = document.querySelector('#m-detalhe');
const sAlternativa = document.querySelector('#m-alternativa');
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbcompras')) ?? [];
const setItensBD = () => localStorage.setItem('dbcompras', JSON.stringify(itens));


function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item,index) => {
        insertItem(item,index)
    })
}

loadItens();

function insertItem(item,index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.produto}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${item.preco_esperado}</td>
        <td>${item.detalhe}</td>
        <td>${item.alternativa}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class="bx bx-edit"></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button> 
        </td>
    `
    tbody.appendChild(tr);
}

function editItem(index){

    openModal(true,index)
}

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openModal(edit= false, index = 0){
    modal.classList.add('active')
    
    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container')!== -1){
            modal.classList.remove('active')
        }
    }

    if(edit){
        sProduto.value = itens[index].produto
        sQuantidade.value = itens[index].quantidade
        sPrecoEsperado.value = itens[index].preco_esperado
        sDetalhe.value = itens[index].detalhe
        sAlternativa.value = itens[index].alternativa
        id = index
    } else{
    sProduto.value = '';
    sQuantidade.value = '';
    sPrecoEsperado.value='';
    sDetalhe.value ='';
    sAlternativa.value='';
    }
}
btnSalvar.onclick = e => {
    if (sProduto.value == '' || sQuantidade.value == '' || sPrecoEsperado.value == '' || sDetalhe.value == '' || sAlternativa.value == '') {
        return
    }

    e.preventDefault();

    if (id != undefined) {
        itens[id].produto = sProduto.value
        itens[id].quantidade = sQuantidade.value
        itens[id].preco_esperado = sPrecoEsperado.value
        itens[id].detalhe = sDetalhe.value
        itens[id].alternativa = sAlternativa.value
    } else {
        itens.push({
            'produto': sProduto.value,
            'quantidade': sQuantidade.value,
            'preco_esperado': sPrecoEsperado.value,
            'detalhe': sDetalhe.value,
            'alternativa': sAlternativa.value
        });
    }
    
    setItensBD();
    modal.classList.remove('active');
    loadItens();
    id = undefined;
};



