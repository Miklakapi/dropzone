'use strict';

const allFiles = {};

function init(dropzoneClass='dropzone') {
    $(document).ready(function () {
        console.log('Initiation dropzone...');
    }).on('click', `.${dropzoneClass}`, function () {
        $(`#${$(this).data('target')}`).trigger('click');
    }).on('dragover', `.${dropzoneClass}`, function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).addClass(`${dropzoneClass}-hover`);
    }).on('dragleave', `.${dropzoneClass}`, function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).removeClass(`${dropzoneClass}-hover`);
    }).on('drop', `.${dropzoneClass}`, function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).removeClass(`${dropzoneClass}-hover`);
        const target = $(this).data('target');
        $(this).append(newFile(target, ...event.originalEvent.dataTransfer.files));
        allFiles[target].push(...event.originalEvent.dataTransfer.files);
        const data = new DataTransfer();
        allFiles[target].forEach(function (file) {
            if (file !== null) {
                data.items.add(file);
            }
        });
        $(this).find('.placeholder').addClass('d-none');
        document.querySelector(`#${target}`).files = data.files;
    }).on('click', `.${dropzoneClass} > .file`, function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = (($(this).attr('id')).split('-'))[2];
        const parent = $(this).parent();
        const target = parent.data('target');
        $(this).remove();
        allFiles[target][id] = null;
        let counter = 0;
        allFiles[target].forEach(function (file) {
            if (file !== null) {
                counter++;
            }
        });
        if (counter === 0) {
            parent.find('.placeholder').removeClass('d-none');
        }
    });
}

function newFile(target, ...files) {
    if (!(target in allFiles)) {
        allFiles[target] = [];
    }
    let id = allFiles[target].length;
    let htmlFiles = '';
    files.forEach(function (file) {
        const fileName = file.name;
        const fileSize = (file.size / (1024 * 1024)).toFixed(2);
        htmlFiles += `
        <div class="file" id="file-id-${id}">
            <div class="name">${fileName}</div>
            <div class="size">${fileSize}</div>
        </div>`;
        id++;
    });
    return htmlFiles;
}

export {
    init as initDropzones,
}