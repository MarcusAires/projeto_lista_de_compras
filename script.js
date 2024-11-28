const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sProduto = document.querySelector('#m-produto');
const sQuantidade = document.querySelector('#m-quantidade');
const sPreco = document.querySelector('#m-preço');
const sDetalhe = document.querySelector('#m-detalhe');
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
        <td>R$ ${item.preco}</td>
        <td>${item.detalhe}</td>
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
        sPreco.value = itens[index].preco
        sDetalhe.value = itens[index].detalhe
        id = index
    } else{
    sProduto.value = '';
    sQuantidade.value = '';
    sPreco.value='';
    sDetalhe.value ='';
    }
}
btnSalvar.onclick = e => {
    if (sProduto.value == '' || sQuantidade.value == '' || sPreco.value == '' || sDetalhe.value == '') {
        return
    }

    e.preventDefault();

    if (id != undefined) {
        itens[id].produto = sProduto.value
        itens[id].quantidade = sQuantidade.value
        itens[id].preco = sPreco.value
        itens[id].detalhe = sDetalhe.value
    } else {
        itens.push({
            'produto': sProduto.value,
            'quantidade': sQuantidade.value,
            'preco_esperado': sPreco.value,
            'detalhe': sDetalhe.value,
        });
    }
    
    setItensBD();
    modal.classList.remove('active');
    loadItens();
    id = undefined;
};



