'use strict';

const allFiles = {};

function init(dropzoneClass='dropzone', limit=-1) {
    $(document).ready(function () {

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
        if (limit === -1 || $(this).find('.file').length < limit) {
            $(this).append(newFile(target, ...event.originalEvent.dataTransfer.files));
            allFiles[target].push(...event.originalEvent.dataTransfer.files);
            insertFilesToInput($(this));
            $(this).find('.placeholder').addClass('d-none');
        }
    }).on('click', `.${dropzoneClass} > .file`, function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = ($(this).attr('id')).split('-')[2];
        const parent = $(this).parent();
        const target = parent.data('target');
        $(this).remove();
        allFiles[target][id] = null;
        insertFilesToInput($(parent));
        $(parent).find('.file').length || parent.find('.placeholder').removeClass('d-none');
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
            <div class="size">${fileSize} MB</div>
        </div>`;
        id++;
    });
    return htmlFiles;
}

function insertFilesToInput($dropzone) {
    const data = new DataTransfer();
    const target = $dropzone.data('target');

    $dropzone.find('.file').each(function (index, file) {
        data.items.add(allFiles[target][$(file).attr('id').split('-')[2]]);
    });
    
    document.querySelector(`#${target}`).files = data.files;
}

export {
    init as initDropzones,
}
