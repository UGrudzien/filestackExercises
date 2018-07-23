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
        onUploadDone: creatingHTMLList,

    };
    const picker = client.picker(options);


    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    openBtn.addEventListener('click', () => picker.open());
    closeBtn.addEventListener('click', () => picker.close());
});
// const inputEl = document.getElementById('fileSelect');
// const picker = client.picker({
//   onUploadDone: res => console.log(res),
// });
// inputEl.addEventListener('change', (e) => {
//   picker.crop(e.target.files);
// });
// files.push('');
// helper function for creating an unorderer HTML list using javascript I took from https://stackoverflow.com/questions/11351135/create-ul-and-li-elements-in-javascript

function creatingHTMLList(response) {
    var pickerFileMetadata = response.filesUploaded; //table of pickerFileMetadata object

    for (var i = 0; i < pickerFileMetadata.length; i++) {
        var filename = pickerFileMetadata[i].filename; //taking a filename properties from pickerfilemetadata object
        var fileUrl = pickerFileMetadata[i].url;
        var clientTransform = client.transform(fileUrl, {
            resize: {
                height: 50,
              width: 50,
            },
        })
        var ul = document.getElementById("filelist");
        var li = document.createElement("li");
        ul.appendChild(li);
        var a = document.createElement("a");
        a.setAttribute("href", fileUrl);
        a.setAttribute("target", "_blank");
        li.appendChild(a);
        const img = document.createElement('img');
        img.src= clientTransform;
      
        var div = document.createElement("div");
       
        a.appendChild(div);
          div.appendChild(img);
          var span =  document.createElement('span');
           a.appendChild(span);
           span.innerText=filename;
           
    //     client.retrieve('9v04TW7ZQLi9V2V3InV0').then((blob) => {
    //         const urlCreator = window.URL || window.webkitURL;
    //         const img = document.createElement('img');
    //         img.width = 720;
    //         img.height = 480;
    //         img.src = urlCreator.createObjectURL(blob);

    //         document.getElementById('content').appendChild(img)
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // });
// var t = document.createTextNode(filename);
//span.innerHTML = span.innerHTML+filename;
a.innerHTML = a.innerHTML ;
}
}