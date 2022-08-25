'use strict';

const allFiles = {};

function init(dropzoneClass='dropzone', limit=-1) {
    $(document).ready(function () {

    }).on('click', `.${dropzoneClass}`, function () {
        $(`#${$(this).data('target')}`).trigger('click');
    }).on('change', 'input[type="file"]', function () {
        const $input = $(this);
        if ($input.hasClass(`${dropzoneClass}-on`)) {
            const newFiles = $input.prop('files');
            const target = $input.attr('id');
            const $dropzone = $(`[data-target="${target}"].${dropzoneClass}`);
            
            for (let i = 0; i < newFiles.length; i++) {
                if (limit === -1 || $dropzone.find('.file').length < limit) {
                    const file = newFiles.item(i);
                    $dropzone.append(newFile(target, file));
                    allFiles[target].push(file);
                    insertFilesToInput($dropzone);
                } else break;
            }
        }
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
        <div class="file" id="file-id-${id}" title="${fileName}">
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
    
    $(`#${target}`).prop('files', data.files);

    if ($dropzone.find('.file').length) $dropzone.find('.placeholder').addClass('d-none');
    else $dropzone.find('.placeholder').removeClass('d-none');
}

export {
    init as initDropzones,
}
