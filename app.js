// app.js - Atualizador de Catálogo Avançado
let catalogoData = null;
let sistemaData = null;
let atualizacoesRealizadas = [];
let novosProdutosAdicionados = [];

// Configurações padrão
let config = {
    atualizarPreco: true,
    atualizarEstoque: true,
    aplicarDescontoNoPreco: true,
    adicionarNovosProdutos: true
};

// Elementos DOM
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const outputSection = document.getElementById('outputSection');
const updateSummary = document.getElementById('updateSummary');
const downloadBtn = document.getElementById('downloadBtn');
const statusDiv = document.getElementById('status');
const fileInfo = document.getElementById('fileInfo');
const configSection = document.getElementById('configSection');
const statsGrid = document.getElementById('statsGrid');
const newProductsSection = document.getElementById('newProductsSection');
const newProductsList = document.getElementById('newProductsList');
const missingProductsSection = document.getElementById('missingProductsSection');
const missingProductsList = document.getElementById('missingProductsList');
const updateTime = document.getElementById('updateTime');
const previewBtn = document.getElementById('previewBtn');
const resetBtn = document.getElementById('resetBtn');
const previewModal = document.getElementById('previewModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalBtn2 = document.getElementById('closeModalBtn2');
const previewModalBody = document.getElementById('previewModalBody');
const clearFileBtn = document.getElementById('clearFileBtn');
const filePreview = document.getElementById('filePreview');
const filePreviewContent = document.getElementById('filePreviewContent');

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    await inicializarAplicacao();
    configurarEventos();
    mostrarConfiguracoes();
});

// Função de inicialização
async function inicializarAplicacao() {
    try {
        catalogoData = await carregarCatalogoAtual();
        if (catalogoData && catalogoData.products) {
            showStatus(`✅ Catálogo carregado: ${catalogoData.products.length} produtos`, 'success');
            console.log(`Catálogo carregado com ${catalogoData.products.length} produtos`);
        } else {
            showStatus('⚠️ Não foi possível carregar o catálogo atual', 'error');
            catalogoData = { products: [] };
        }
    } catch (error) {
        console.error('Erro na inicialização:', error);
        showStatus('Erro ao carregar o catálogo', 'error');
    }
}

// Função para carregar o catálogo atual
async function carregarCatalogoAtual() {
    try {
        const response = await fetch('Produtos do Catálogo.js');
        const text = await response.text();
        
        // Extrair o objeto productsData usando regex mais robusto
        const match = text.match(/const productsData\s*=\s*(\{[\s\S]*?\})\s*;/);
        
        if (match && match[1]) {
            // Corrigir JSON (remover trailing commas e tratar aspas)
            let jsonStr = match[1]
                .replace(/,\s*}/g, '}')
                .replace(/,\s*]/g, ']')
                .replace(/'/g, '"');
            
            // Parsear o JSON
            const data = JSON.parse(jsonStr);
            console.log(`✅ Catálogo carregado: ${data.products.length} produtos`);
            return data;
        } else {
            throw new Error('Estrutura do arquivo não reconhecida');
        }
    } catch (error) {
        console.warn('Não foi possível carregar o catálogo externo:', error);
        
        // Fallback: criar catálogo vazio
        return {
            products: []
        };
    }
}

// Configurar eventos
function configurarEventos() {
    // Drag and drop
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.json')) {
            processFile(file);
        } else {
            showStatus('Por favor, selecione apenas arquivos JSON', 'error');
        }
    });

    // Input de arquivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.json')) {
            processFile(file);
        } else {
            showStatus('Por favor, selecione apenas arquivos JSON', 'error');
        }
    });

    // Botão de visualização
    previewBtn.addEventListener('click', mostrarModalVisualizacao);

    // Botão de reset
    resetBtn.addEventListener('click', resetarAplicacao);

    // Botão de limpar arquivo
    if (clearFileBtn) {
        clearFileBtn.addEventListener('click', () => {
            fileInput.value = '';
            filePreview.style.display = 'none';
            sistemaData = null;
            showStatus('Arquivo removido. Carregue um novo arquivo.', 'info');
        });
    }

    // Modal
    closeModalBtn.addEventListener('click', () => {
        previewModal.style.display = 'none';
    });

    closeModalBtn2.addEventListener('click', () => {
        previewModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
}

// Atualizar configurações baseado nos checkboxes
function atualizarConfiguracoes() {
    const precoCheckbox = document.getElementById('precoCheckbox');
    const estoqueCheckbox = document.getElementById('estoqueCheckbox');
    const descontoCheckbox = document.getElementById('descontoCheckbox');
    const novosProdutosCheckbox = document.getElementById('novosProdutosCheckbox');

    if (precoCheckbox) config.atualizarPreco = precoCheckbox.checked;
    if (estoqueCheckbox) config.atualizarEstoque = estoqueCheckbox.checked;
    if (descontoCheckbox) config.aplicarDescontoNoPreco = descontoCheckbox.checked;
    if (novosProdutosCheckbox) config.adicionarNovosProdutos = novosProdutosCheckbox.checked;
}

// Mostrar seção de configurações
function mostrarConfiguracoes() {
    // Configurações já estão no HTML, apenas atualizar eventos
    const precoCheckbox = document.getElementById('precoCheckbox');
    const estoqueCheckbox = document.getElementById('estoqueCheckbox');
    const descontoCheckbox = document.getElementById('descontoCheckbox');
    const novosProdutosCheckbox = document.getElementById('novosProdutosCheckbox');

    if (precoCheckbox) {
        precoCheckbox.addEventListener('change', () => {
            atualizarConfiguracoes();
            atualizarVisibilidadeDesconto();
        });
    }

    if (estoqueCheckbox) {
        estoqueCheckbox.addEventListener('change', atualizarConfiguracoes);
    }

    if (descontoCheckbox) {
        descontoCheckbox.addEventListener('change', atualizarConfiguracoes);
    }

    if (novosProdutosCheckbox) {
        novosProdutosCheckbox.addEventListener('change', atualizarConfiguracoes);
    }

    // Inicializar configurações
    atualizarConfiguracoes();
    atualizarVisibilidadeDesconto();
}

// Atualizar visibilidade da opção de desconto
function atualizarVisibilidadeDesconto() {
    const descontoOption = document.getElementById('descontoOption');
    if (descontoOption) {
        if (config.atualizarPreco) {
            descontoOption.style.display = 'block';
        } else {
            descontoOption.style.display = 'none';
            const descontoCheckbox = document.getElementById('descontoCheckbox');
            if (descontoCheckbox) {
                descontoCheckbox.checked = false;
                config.aplicarDescontoNoPreco = false;
            }
        }
    }
}

// Processar arquivo carregado
function processFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            sistemaData = JSON.parse(e.target.result);
            
            if (!sistemaData.products) {
                throw new Error('Arquivo JSON inválido. Estrutura esperada: { "products": [...] }');
            }
            
            mostrarInfoArquivo(file);
            atualizarCatalogo();
            
        } catch (error) {
            console.error('Erro ao processar JSON:', error);
            showStatus(`Erro ao processar o arquivo: ${error.message}`, 'error');
        }
    };
    
    reader.onerror = function() {
        showStatus('Erro ao ler o arquivo', 'error');
    };
    
    reader.readAsText(file);
}

// Mostrar informações do arquivo
function mostrarInfoArquivo(file) {
    const fileInfoHTML = `
        <strong>Arquivo carregado:</strong> ${file.name}<br>
        <strong>Tamanho:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
        <strong>Produtos no sistema:</strong> ${sistemaData.products.length}
    `;
    fileInfo.innerHTML = fileInfoHTML;

    // Mostrar preview do arquivo
    if (filePreview && filePreviewContent) {
        filePreviewContent.innerHTML = `
            <div><strong>Nome:</strong> ${file.name}</div>
            <div><strong>Produtos:</strong> ${sistemaData.products.length}</div>
            <div><strong>Última modificação:</strong> ${new Date(file.lastModified).toLocaleString('pt-BR')}</div>
        `;
        filePreview.style.display = 'block';
    }
}

// Função para calcular preço com desconto
function calcularPrecoComDesconto(precoOriginal, percentualDesconto) {
    if (!percentualDesconto || percentualDesconto <= 0) {
        return precoOriginal;
    }
    
    const desconto = precoOriginal * (percentualDesconto / 100);
    return Math.round((precoOriginal - desconto) * 100) / 100;
}

// Criar estrutura básica para novo produto
function criarNovoProduto(produtoSistema, categoria) {
    return {
        id: produtoSistema.id,
        name: produtoSistema.name,
        category: categoria || "Outros",
        sellingPrice: produtoSistema.sellingPrice,
        stock: produtoSistema.stock,
        discount: 0, // Desconto inicial 0%
        images: ["default.webp"] // Imagem padrão
    };
}

// Determinar categoria do produto baseado no nome
function determinarCategoria(nome) {
    const nomeLower = nome.toLowerCase();
    
    if (nomeLower.includes('sandália') || nomeLower.includes('rasteirinha') || nomeLower.includes('papete') || nomeLower.includes('vizzano')) {
        return "Shoes";
    } else if (nomeLower.includes('bolsa') || nomeLower.includes('carteira')) {
        return "Bags";
    } else if (nomeLower.includes('cinto')) {
        return "Belts";
    } else if (nomeLower.includes('legging') || nomeLower.includes('top') || nomeLower.includes('macaquinho') || nomeLower.includes('short') || nomeLower.includes('conjunto')) {
        if (nomeLower.includes('activewear') || nomeLower.includes('legging') || nomeLower.includes('top')) {
            return "Activewear";
        } else {
            return "Clothing";
        }
    } else if (nomeLower.includes('alfaiataria') || nomeLower.includes('algodão')) {
        return "Clothing";
    }
    
    return "Outros";
}

// Atualizar o catálogo com os dados do sistema
function atualizarCatalogo() {
    if (!sistemaData || !catalogoData) {
        showStatus('Dados insuficientes para atualizar', 'error');
        return;
    }
    
    console.log('Iniciando atualização com configurações:', config);
    console.log('Produtos no sistema:', sistemaData.products.length);
    console.log('Produtos no catálogo:', catalogoData.products.length);
    
    // Atualizar configurações
    atualizarConfiguracoes();
    
    // Criar mapa dos produtos do sistema
    const sistemaMap = {};
    sistemaData.products.forEach(product => {
        sistemaMap[product.id] = {
            sellingPrice: product.sellingPrice,
            stock: product.stock,
            name: product.name,
            category: product.category
        };
    });
    
    // Criar mapa dos produtos do catálogo original (para referência)
    const catalogoOriginalMap = {};
    catalogoData.products.forEach(product => {
        catalogoOriginalMap[product.id] = {
            sellingPrice: product.sellingPrice,
            stock: product.stock,
            discount: product.discount || 0,
            name: product.name,
            images: product.images || ["default.webp"]
        };
    });
    
    // Resetar arrays
    atualizacoesRealizadas = [];
    novosProdutosAdicionados = [];
    
    // Contadores
    let produtosAtualizados = 0;
    let produtosSemMudanca = 0;
    let produtosNaoEncontrados = [];
    let produtosNovosAdicionados = 0;
    
    // Criar cópia do catálogo para modificar
    const catalogoAtualizado = JSON.parse(JSON.stringify(catalogoData));
    
    // 1. Primeiro, atualizar produtos existentes
    catalogoAtualizado.products.forEach(product => {
        const produtoSistema = sistemaMap[product.id];
        const produtoCatalogoOriginal = catalogoOriginalMap[product.id];
        
        if (produtoSistema) {
            let mudancas = [];
            let precoCalculado = produtoSistema.sellingPrice;
            
            // Aplicar desconto se configurado
            if (config.atualizarPreco && config.aplicarDescontoNoPreco && produtoCatalogoOriginal.discount > 0) {
                precoCalculado = calcularPrecoComDesconto(produtoSistema.sellingPrice, produtoCatalogoOriginal.discount);
                mudancas.push(`Preço com ${produtoCatalogoOriginal.discount}% de desconto aplicado`);
            }
            
            // Verificar e aplicar atualização de preço
            if (config.atualizarPreco && precoCalculado !== product.sellingPrice) {
                const oldPrice = product.sellingPrice;
                product.sellingPrice = precoCalculado;
                mudancas.push(`Preço: R$ ${oldPrice.toFixed(2)} → R$ ${precoCalculado.toFixed(2)}`);
            }
            
            // Verificar e aplicar atualização de estoque
            if (config.atualizarEstoque && produtoSistema.stock !== product.stock) {
                const oldStock = product.stock;
                product.stock = produtoSistema.stock;
                mudancas.push(`Estoque: ${oldStock} → ${produtoSistema.stock}`);
            }
            
            // Registrar atualização se houve mudanças
            if (mudancas.length > 0) {
                produtosAtualizados++;
                
                atualizacoesRealizadas.push({
                    id: product.id,
                    name: product.name,
                    mudancas: mudancas,
                    precoOriginal: produtoCatalogoOriginal.sellingPrice,
                    precoSistema: produtoSistema.sellingPrice,
                    precoFinal: product.sellingPrice,
                    desconto: produtoCatalogoOriginal.discount,
                    estoqueAnterior: produtoCatalogoOriginal.stock,
                    estoqueNovo: product.stock,
                    tipo: 'atualizado'
                });
            } else {
                produtosSemMudanca++;
            }
            
            // Remover do mapa de sistema para não ser considerado como novo
            delete sistemaMap[product.id];
        } else {
            produtosNaoEncontrados.push({
                id: product.id,
                name: product.name
            });
        }
    });
    
    // 2. Adicionar novos produtos do sistema (se configurado)
    if (config.adicionarNovosProdutos) {
        Object.values(sistemaMap).forEach(produtoSistema => {
            // Encontrar o objeto completo do sistema pelo ID
            const produtoCompleto = sistemaData.products.find(p => p.id === Object.keys(sistemaMap).find(key => sistemaMap[key] === produtoSistema));
            
            if (produtoCompleto) {
                const categoria = determinarCategoria(produtoCompleto.name);
                const novoProduto = criarNovoProduto(produtoCompleto, categoria);
                
                catalogoAtualizado.products.push(novoProduto);
                produtosNovosAdicionados++;
                
                novosProdutosAdicionados.push({
                    id: novoProduto.id,
                    name: novoProduto.name,
                    categoria: categoria,
                    preco: novoProduto.sellingPrice,
                    estoque: novoProduto.stock,
                    tipo: 'novo'
                });
                
                console.log(`Novo produto adicionado: ${novoProduto.id} - ${novoProduto.name}`);
            }
        });
    }
    
    // Atualizar a variável global
    catalogoData = catalogoAtualizado;
    
    // Atualizar hora da atualização
    const agora = new Date();
    updateTime.textContent = `Atualizado em: ${agora.toLocaleString('pt-BR')}`;
    
    // Mostrar resumo
    mostrarResumoAtualizacao(produtosAtualizados, produtosSemMudanca, produtosNaoEncontrados, produtosNovosAdicionados);
    
    // Mostrar seção de output
    outputSection.style.display = 'block';
    
    showStatus(`✅ Atualização concluída! ${produtosAtualizados} produtos atualizados, ${produtosNovosAdicionados} novos produtos adicionados.`, 'success');
}

// Mostrar resumo da atualização
function mostrarResumoAtualizacao(atualizados, semMudanca, naoEncontrados, novosAdicionados) {
    // Atualizar estatísticas
    const statsHTML = `
        <div class="stat-card success">
            <div class="stat-icon">
                <i class="fas fa-sync-alt"></i>
            </div>
            <div class="stat-number">${atualizados}</div>
            <div class="stat-label">Produtos Atualizados</div>
        </div>
        
        <div class="stat-card info">
            <div class="stat-icon">
                <i class="fas fa-plus-circle"></i>
            </div>
            <div class="stat-number">${novosAdicionados}</div>
            <div class="stat-label">Novos Produtos</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-number">${semMudanca}</div>
            <div class="stat-label">Sem Alterações</div>
        </div>
        
        <div class="stat-card ${naoEncontrados.length > 0 ? 'warning' : ''}">
            <div class="stat-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="stat-number">${naoEncontrados.length}</div>
            <div class="stat-label">Não Encontrados</div>
        </div>
    `;
    
    statsGrid.innerHTML = statsHTML;
    
    // Mostrar novos produtos
    if (novosAdicionados > 0) {
        let novosProdutosHTML = '';
        novosProdutosAdicionados.forEach(produto => {
            novosProdutosHTML += `
                <div class="new-product-card">
                    <h5>${produto.name}</h5>
                    <p><strong>ID:</strong> ${produto.id}</p>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                    <p><strong>Estoque:</strong> ${produto.estoque}</p>
                    <p><strong>Desconto:</strong> 0% (inicial)</p>
                </div>
            `;
        });
        
        newProductsList.innerHTML = novosProdutosHTML;
        newProductsSection.style.display = 'block';
    } else {
        newProductsSection.style.display = 'none';
    }
    
    // Mostrar produtos não encontrados
    if (naoEncontrados.length > 0) {
        let naoEncontradosHTML = '';
        naoEncontrados.forEach(produto => {
            naoEncontradosHTML += `
                <div class="missing-product-card">
                    <h5>${produto.name}</h5>
                    <p><strong>ID:</strong> ${produto.id}</p>
                    <p><em>Produto no catálogo mas não encontrado no sistema</em></p>
                </div>
            `;
        });
        
        missingProductsList.innerHTML = naoEncontradosHTML;
        missingProductsSection.style.display = 'block';
    } else {
        missingProductsSection.style.display = 'none';
    }
    
    // Configurações aplicadas
    const configTexto = `
        <div class="config-applied">
            <strong>Configurações aplicadas:</strong><br>
            ${config.atualizarPreco ? '✅ Atualizar Preços' : '❌ Não atualizar preços'} | 
            ${config.atualizarEstoque ? '✅ Atualizar Estoque' : '❌ Não atualizar estoque'} | 
            ${config.adicionarNovosProdutos ? '✅ Adicionar novos produtos' : '❌ Não adicionar novos produtos'}
            ${config.atualizarPreco && config.aplicarDescontoNoPreco ? ' | ✅ Preço com desconto aplicado' : ''}
        </div>
    `;
    
    // Detalhes das atualizações
    let detalhesHTML = '';
    if (atualizacoesRealizadas.length > 0) {
        detalhesHTML += `
            <div class="details-section">
                <strong>📝 Detalhes das atualizações (${Math.min(3, atualizacoesRealizadas.length)} de ${atualizacoesRealizadas.length}):</strong>`;
        
        atualizacoesRealizadas.slice(0, 3).forEach(item => {
            let detalhesPreco = '';
            if (config.atualizarPreco) {
                detalhesPreco = `<div><strong>Preço Sistema:</strong> R$ ${item.precoSistema.toFixed(2)}</div>`;
                if (item.desconto > 0 && config.aplicarDescontoNoPreco) {
                    detalhesPreco += `<div><strong>Desconto:</strong> ${item.desconto}% → <strong>Preço Final:</strong> R$ ${item.precoFinal.toFixed(2)}</div>`;
                }
            }
            
            detalhesHTML += `
                <div class="detail-item">
                    <div class="detail-header">
                        <strong>${item.name}</strong> (${item.id})
                    </div>
                    <div class="detail-body">
                        ${detalhesPreco}
                        ${config.atualizarEstoque ? `<div><strong>Estoque:</strong> ${item.estoqueAnterior} → ${item.estoqueNovo}</div>` : ''}
                        <div class="detail-changes">${item.mudancas.join('<br>')}</div>
                    </div>
                </div>`;
        });
        
        if (atualizacoesRealizadas.length > 3) {
            detalhesHTML += `
                <div class="more-items">
                    ... e mais ${atualizacoesRealizadas.length - 3} atualizações
                </div>`;
        }
        
        detalhesHTML += `</div>`;
    }
    
    updateSummary.innerHTML = configTexto + detalhesHTML;
}

// Mostrar modal de visualização
function mostrarModalVisualizacao() {
    if (!catalogoData || catalogoData.products.length === 0) {
        showStatus('Nenhum catálogo para visualizar', 'error');
        return;
    }
    
    let modalHTML = `
        <h4>Resumo Completo da Atualização</h4>
        <div class="modal-stats">
            <div class="modal-stat">
                <strong>Total de Produtos:</strong> ${catalogoData.products.length}
            </div>
            <div class="modal-stat">
                <strong>Produtos Atualizados:</strong> ${atualizacoesRealizadas.length}
            </div>
            <div class="modal-stat">
                <strong>Novos Produtos Adicionados:</strong> ${novosProdutosAdicionados.length}
            </div>
        </div>
    `;
    
    // Mostrar todos os produtos atualizados
    if (atualizacoesRealizadas.length > 0) {
        modalHTML += `<h5>Produtos Atualizados:</h5>`;
        atualizacoesRealizadas.forEach(item => {
            modalHTML += `
                <div class="modal-product">
                    <strong>${item.name} (${item.id})</strong><br>
                    ${item.mudancas.join('<br>')}
                </div>
            `;
        });
    }
    
    // Mostrar todos os novos produtos
    if (novosProdutosAdicionados.length > 0) {
        modalHTML += `<h5>Novos Produtos Adicionados:</h5>`;
        novosProdutosAdicionados.forEach(produto => {
            modalHTML += `
                <div class="modal-product">
                    <strong>${produto.name} (${produto.id})</strong><br>
                    Categoria: ${produto.categoria}<br>
                    Preço: R$ ${produto.preco.toFixed(2)}<br>
                    Estoque: ${produto.estoque}<br>
                    Desconto: 0%
                </div>
            `;
        });
    }
    
    previewModalBody.innerHTML = modalHTML;
    previewModal.style.display = 'flex';
}

// Resetar aplicação
function resetarAplicacao() {
    // Limpar input de arquivo
    fileInput.value = '';
    
    // Limpar preview
    if (filePreview) {
        filePreview.style.display = 'none';
    }
    
    // Esconder seção de output
    outputSection.style.display = 'none';
    
    // Resetar dados
    sistemaData = null;
    atualizacoesRealizadas = [];
    novosProdutosAdicionados = [];
    
    // Resetar status
    showStatus('Pronto para nova atualização. Carregue um arquivo JSON.', 'info');
}

// Configurar botão de download
downloadBtn.addEventListener('click', () => {
    if (!catalogoData || !catalogoData.products || catalogoData.products.length === 0) {
        showStatus('Nenhum catálogo para baixar', 'error');
        return;
    }
    
    // Formatar data para o nome do arquivo
    const agora = new Date();
    const dataFormatada = `${agora.getDate().toString().padStart(2, '0')}-${(agora.getMonth() + 1).toString().padStart(2, '0')}-${agora.getFullYear()}`;
    const horaFormatada = `${agora.getHours().toString().padStart(2, '0')}${agora.getMinutes().toString().padStart(2, '0')}`;
    
    // Nome do arquivo com data
    const nomeArquivo = `Catálogo Atualizado ${dataFormatada} ${horaFormatada}.js`;
    
    // Configurações aplicadas para o cabeçalho
    const configTexto = `
        - ${config.atualizarPreco ? 'Preços atualizados' : 'Preços mantidos'}
        - ${config.atualizarEstoque ? 'Estoque atualizado' : 'Estoque mantido'}
        - ${config.adicionarNovosProdutos ? 'Novos produtos adicionados' : 'Novos produtos não adicionados'}
        - ${config.atualizarPreco && config.aplicarDescontoNoPreco ? 'Preços com desconto aplicado' : 'Preços sem desconto aplicado'}
    `.replace(/^\s+/gm, ''); // Remove espaços no início das linhas
    
    // Criar conteúdo do arquivo JS
    const fileContent = `// ============================================
// CATÁLOGO ATUALIZADO
// ============================================
// Data da atualização: ${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}
// Total de produtos: ${catalogoData.products.length}
// Produtos atualizados: ${atualizacoesRealizadas.length}
// Novos produtos adicionados: ${novosProdutosAdicionados.length}
// Configurações aplicadas:
${configTexto.split('\n').map(line => `// ${line}`).join('\n')}
// ============================================

const productsData = ${JSON.stringify(catalogoData, null, 4)};`;
    
    // Criar blob e link de download
    const blob = new Blob([fileContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = nomeArquivo;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showStatus(`✅ Arquivo "${nomeArquivo}" baixado com sucesso!`, 'success');
});

// Mostrar mensagens de status
function showStatus(message, type = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.opacity = '1';
    
    // Limpar mensagem após alguns segundos (apenas para sucesso)
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.opacity = '0.7';
        }, 5000);
    }
}

// Adicionar estilos CSS dinâmicos
const style = document.createElement('style');
style.textContent = `
    .config-options {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin: 20px 0;
    }
    
    .config-checkbox {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 35px;
        cursor: pointer;
        user-select: none;
        font-size: 16px;
        color: #333;
        min-width: 200px;
        margin: 5px 0;
    }
    
    .config-checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 4px;
        transition: all 0.3s;
    }
    
    .config-checkbox:hover input ~ .checkmark {
        background-color: #ccc;
    }
    
    .config-checkbox input:checked ~ .checkmark {
        background-color: #2196F3;
    }
    
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    
    .config-checkbox input:checked ~ .checkmark:after {
        display: block;
    }
    
    .config-checkbox .checkmark:after {
        left: 9px;
        top: 5px;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
    
    .config-hint {
        display: block;
        font-size: 12px;
        color: #666;
        margin-top: 4px;
        font-style: italic;
    }
    
    .config-applied {
        background: #e8f5e9;
        padding: 12px;
        border-radius: 8px;
        margin: 15px 0;
        border-left: 4px solid #4CAF50;
        font-size: 14px;
    }
    
    .warning-section, .details-section {
        margin-top: 20px;
    }
    
    .detail-item {
        background: white;
        border-radius: 8px;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #e0e0e0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .detail-header {
        font-size: 14px;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .detail-body {
        font-size: 13px;
        color: #555;
    }
    
    .detail-changes {
        margin-top: 8px;
        padding: 8px;
        background: #f8f9fa;
        border-radius: 4px;
        font-size: 12px;
    }
    
    .more-items {
        text-align: center;
        color: #666;
        font-size: 12px;
        margin-top: 10px;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 4px;
    }
    
    .modal-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .modal-stat {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
    }
    
    .modal-product {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 12px;
        margin: 10px 0;
        font-size: 14px;
    }
    
    @media (max-width: 768px) {
        .config-options {
            flex-direction: column;
            gap: 10px;
        }
        
        .config-checkbox {
            min-width: 100%;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Aplicação iniciada com funcionalidades avançadas');
