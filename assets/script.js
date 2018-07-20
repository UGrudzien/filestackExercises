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


    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    openBtn.addEventListener('click', () => picker.open());
    closeBtn.addEventListener('click', () => picker.close());
});

// helper function for creating an unorderer HTML list using javascript I took from https://stackoverflow.com/questions/11351135/create-ul-and-li-elements-in-javascript
function creatingHtmlList(response) {
     var pickerFileMetadata = response.filesUploaded; //table of pickerFileMetadata object
    for (var i = 0; i < pickerFileMetadata.length; i++) {
        var filename = pickerFileMetadata[i].filename; //taking a filename properties from pickerfilemetadata object
        var ul = document.getElementById("filelist");
        var li = document.createElement("li");
        ul.appendChild(li);
        var t = document.createTextNode(filename);
        li.innerHTML = li.innerHTML + filename;
    }
}


