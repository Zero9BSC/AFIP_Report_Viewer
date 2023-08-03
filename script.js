var selectedCard = null;

document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var content = e.target.result;
            var fileName = file.name;
            if (!fileName.endsWith('.html')) {
                fileName += '.html';
            }

            // Crear una nueva tarjeta con el nombre del archivo
            var card = createFileCard(fileName.replace('.html', ''));
            document.querySelector('.file-list').appendChild(card);

            // Al hacer clic en la tarjeta, mostrar el contenido
            card.addEventListener('click', function () {
                showFileContent(fileName, content);

                // Cambiar el color de fondo de la tarjeta seleccionada
                if (selectedCard) {
                    selectedCard.classList.remove('selected');
                }
                selectedCard = card;
                selectedCard.classList.add('selected');
            });
        };

        fileReader.readAsText(file);
    }
}

function createFileCard(fileName) {
    // Crear la tarjeta con borde redondeado y sombreado
    var card = document.createElement('div');
    card.classList.add('card', 'border-primary', 'rounded', 'shadow-sm', 'h-100');
    card.innerHTML = `
        <div class="card-body p-2 d-flex flex-column justify-content-between">
          <h5 class="card-title mb-1">${fileName}</h5>
        </div>
      `;

    return card;
}