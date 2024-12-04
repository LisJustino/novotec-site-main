document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        document.getElementById('nome').value = usuarioLogado.nome;
        document.getElementById('cpf').value = usuarioLogado.cpf;
        document.getElementById('email').value = usuarioLogado.email;
        document.getElementById('cep').value = usuarioLogado.cep || '';
        document.getElementById('endereco').value = usuarioLogado.endereco || '';
        document.getElementById('estado').value = usuarioLogado.estado || '';
        document.getElementById('cidade').value = usuarioLogado.cidade || '';
    }

    const cepInput = document.getElementById("cep");
    const ruaInput = document.getElementById("endereco");
    const estadoInput = document.getElementById("estado");
    const cidadeInput = document.getElementById("cidade");
    const salvarBtn = document.getElementById("salvar");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");
    const header = document.querySelector(".header"); // Seleciona o header

    function aplicarMascaraCEP(cep) {
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    cepInput.addEventListener("input", function () {
        let valor = cepInput.value.replace(/\D/g, '');
        if (valor.length <= 8) {
            cepInput.value = aplicarMascaraCEP(valor);
        }
    });

    cepInput.addEventListener("blur", async () => {
        const cep = cepInput.value.replace(/\D/g, "");
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar o CEP.");
                }

                const data = await response.json();

                if (data.erro) {
                    alert("CEP não encontrado!");
                    return;
                }

                ruaInput.value = data.logradouro || "";
                estadoInput.value = data.uf || "";
                cidadeInput.value = data.localidade || "";
            } catch (error) {
                alert("Erro ao buscar o CEP: " + error.message);
            }
        } else {
            alert("CEP inválido! Certifique-se de que o CEP contém 8 números.");
        }
    });

    salvarBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const usuarioAtualizado = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            endereco: document.getElementById('endereco').value,
            estado: document.getElementById('estado').value,
            cidade: document.getElementById('cidade').value,
        };

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        header.classList.add("inactive"); // Desativa o header

        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            header.classList.remove("inactive"); // Reativa o header
        }, 5000);
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        header.classList.remove("inactive"); // Reativa o header
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            header.classList.remove("inactive"); // Reativa o header
        }
    });
});
