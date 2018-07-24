//  import * as filestack from '/node_modules/filestack-js';
// const client = filestack.init('apikey');

const client = filestack.init('ADY3Owf7wRiWAXEIJ7cCrz');

window.addEventListener('DOMContentLoaded', function () {
    var files = [];
    const options = {
        displayMode: 'inline',
        container: '#inline',
        maxFiles: 5,
        uploadInBackground: false,
        disableThumbnails: false,
        onClose: function () {

        },
        onUploadDone: onUpload,

    };
    const picker = client.picker(options);

    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    openBtn.addEventListener('click', () => picker.open());
    closeBtn.addEventListener('click', () => picker.close());
});


function onUpload(response) {//function called after file uploud
    var pickerFileMetadataArray = response.filesUploaded; //array of pickerFileMetadata
    for (var i = 0; i < pickerFileMetadataArray.length; i++) {

        var pickerFileMetadata = pickerFileMetadataArray[i];
        var fileUrl = pickerFileMetadataArray[i].url;
        creatingHTMLList(fileUrl, pickerFileMetadata);      
    }
}

function documentToImage(fileUrl) {// transfore the first page of docuemnt to an image
    var documentToImage = client.transform(fileUrl, {
        output: {
            format: "jpg",
            page: 1,
        },
    });
    return documentToImage;
}

function imageUrlThunbnailTransformation(fileUrl) { //changing original image into the thumnail image
    var imageTransform = client.transform(fileUrl, {
        resize: {
            height: 50,
            width: 50,
        },
    })
    return imageTransform;
}

function creatingHTMLList(fileUrl, pickerFileMetadata) {
    var ul = document.getElementById("filelist");
    var li = document.createElement("li");
    ul.appendChild(li);

    var a = document.createElement("a");
    li.appendChild(a);
    var div = document.createElement("div");
    a.appendChild(div);
    var mimetype = pickerFileMetadata.mimetype.split("/", 1);
    if (pickerFileMetadata.mimetype == "application/msword") {//if statement for document
        a.setAttribute("href", "#");
        var currentDocumentToImage = documentToImage(fileUrl);
        //creating a thumnail for document
        const img = document.createElement('img');
        img.src = imageUrlThunbnailTransformation(currentDocumentToImage);
        div.appendChild(img);

        var handle = pickerFileMetadata.handle; //creating a Preview for document
        var preview = function () {
            client.preview(handle);
        };
        var link = a.addEventListener("click", preview);


    } else if (mimetype == "image") {//if statement for image
        a.setAttribute("href", fileUrl); //creating a new window with image
        a.setAttribute("target", "_blank");
        const img = document.createElement('img');
        img.src = imageUrlThunbnailTransformation(fileUrl); //creating a thumnail for image
        div.appendChild(img);


    } else { //if statement for file neither image nor .doc
        a.setAttribute("href",fileUrl);
        a.setAttribute("downloud", "");
        
    }


    var span = document.createElement('span');
    a.appendChild(span);
    span.innerText = pickerFileMetadata.filename;

    a.innerHTML = a.innerHTML;
}

