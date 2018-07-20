//  import * as filestack from '/node_modules/filestack-js';
// const client = filestack.init('apikey');

const client = filestack.init('ADY3Owf7wRiWAXEIJ7cCrz');

window.addEventListener('DOMContentLoaded', function () {

    const options = {
        displayMode: 'inline',
        container: '#inline',
        maxFiles: 5,
        uploadInBackground: false,
        onClose: function () {

        },
        onUploadDone: creatingHtmlList,
    };
    const picker = client.picker(options);
    // document.getElementById("content").innerHTML = picker;

    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    openBtn.addEventListener('click', () => picker.open());
    closeBtn.addEventListener('click', () => picker.close());
});

function creatingHtmlList(response) {
     var pickerFileMetadata = response.filesUploaded;
    for (var i = 0; i < pickerFileMetadata.length; i++) {
        var filename = pickerFileMetadata[i].filename;
        var ul = document.getElementById("filelist");
        var li = document.createElement("li");
        ul.appendChild(li);
        var t = document.createTextNode(filename);
        li.innerHTML = li.innerHTML + filename;
    }
}


// document.querySelector('input').addEventListener('change', (event) => {
//     const files = event.target.files;
//     const file = files.item(0);
//     const token = {};


//     client.upload(file, {
//             onProgress
//         }, {}, token)
//         .then(res => {
//             console.log('success: ', res)
//         })
//         .catch(err => {
//             console.log(err)
//         });
// });