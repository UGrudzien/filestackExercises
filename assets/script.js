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
    var pickerFileMetadata = response.filesUploaded; //table of pickerFileMetadata array

    for (var i = 0; i < pickerFileMetadata.length; i++) {
        var filename = pickerFileMetadata[i].filename; //taking a filename properties from pickerfilemetadata object
        var fileUrl = pickerFileMetadata[i].url;
        var mimetypeTyp = pickerFileMetadata[i].mimetype.split("/",1);
        if (mimetypeTyp =="application"){
            var pdfToImage = client.transform(fileUrl, {
                output:{
                    format:"jpg",
                    page:1,
                },
            })
             var preview = client.preview(fileUrl);
              var imageTransform = imageUrlThunbnailTransformation(pdfToImage);
            fileUrl=pdfToImage;
           //   creatingHTMLList(preview, filename, imageTransform);
        }
        var imageTransform = imageUrlThunbnailTransformation(fileUrl); //url for thumnail image
        creatingHTMLList(fileUrl, filename, imageTransform);
        // document.getElementsByTagName("span").innerText = filename;
        // imageThumbnail(ImageTransform);
    }
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
function documentUrlThumbnailTransformation(){

}
// function preview(preview){
//     document.getElementsByTagName("a").onClick 
// }

function creatingHTMLList(fileUrl, filename, imageTransform) {
    var ul = document.getElementById("filelist");
    var li = document.createElement("li");
    ul.appendChild(li);

    var a = document.createElement("a");
    a.setAttribute("href", fileUrl);
    a.setAttribute("target", "_blank");
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