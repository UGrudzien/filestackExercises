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

// helper function for creating an unorderer HTML list using javascript I took from https://stackoverflow.com/questions/11351135/create-ul-and-li-elements-in-javascript

function onUpload(response) {
    var pickerFileMetadataArray = response.filesUploaded; //array of pickerFileMetadata

    for (var i = 0; i < pickerFileMetadataArray.length; i++) {
        var filename = pickerFileMetadataArray[i].filename; //taking a filename properties from pickerfilemetadata object
        var fileUrl = pickerFileMetadataArray[i].url;
        var mimetypeTyp = pickerFileMetadataArray[i].mimetype.split("/", 1);
        if (mimetypeTyp == "application") {
            var documentToImage=documentToImage(fileUrl);
            var handle = pickerFileMetadata[i].handle;
            var preview = function () {
                client.preview(handle)
            };
            var links = document.getElementsByTagName("a");

            for (var i = 0; i < links.length; i++) {

                var link = links[i].addEventListener("click", preview);
            };
            // myWindow = window.open("data:text/html," + preview,
            //            "_blank");
            // myWindow.focus();
            var imageTransform = imageUrlThunbnailTransformation(documentToImage);
            fileUrl = documentToImage;
            //   creatingHTMLList(preview, filename, imageTransform);
        }
        var imageTransform = imageUrlThunbnailTransformation(fileUrl); //url for thumnail image
        creatingHTMLList(fileUrl, filename, imageTransform);
        // document.getElementsByTagName("span").innerText = filename;
        // imageThumbnail(ImageTransform);
    }
}

function documentToImage(fileUrl) {
    var documentToImage = client.transform(fileUrl, {
        output: {
            format: "jpg",
            page: 1,
        },
    })
    return documentToImage;
}

function imageUrlThunbnailTransformation(fileUrl) { //changing original image into the thumnail image
    var ImageTransform = client.transform(fileUrl, {
        resize: {
            height: 50,
            width: 50,
        },
    })
    return ImageTransform;
}

function documentUrlThumbnailTransformation() {

}
// function preview(preview){
//     document.getElementsByTagName("a").onClick 
// }

function creatingHTMLList(fileUrl, filename, imageTransform) {
    var ul = document.getElementById("filelist");
    var li = document.createElement("li");
    ul.appendChild(li);

    var a = document.createElement("a");
    a.setAttribute("className", "link");
    a.setAttribute("href", "#");
    //a.setAttribute("target", "_blank");
    li.appendChild(a);

    var div = document.createElement("div");
    a.appendChild(div);
    const img = document.createElement('img');
    img.src = imageTransform;
    // var div = document.createElement("div");
    div.appendChild(img);

    var span = document.createElement('span');
    a.appendChild(span);
    span.innerText = filename;

    a.innerHTML = a.innerHTML;
}

function imageThumbnail(imageTransform) { //creating a img HTML element

}