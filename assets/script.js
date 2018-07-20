// import * as filestack from 'filestack-js';
// const client = filestack.init('apikey');

const client = filestack.init('ADY3Owf7wRiWAXEIJ7cCrz');

    window.addEventListener('DOMContentLoaded', function () {
    const apikey = 'ADY3Owf7wRiWAXEIJ7cCrz';
    const client = filestack.init(apikey);
    const options = {
        displayMode: 'inline',
        container: '#inline',
        maxFiles: 5,
        uploadInBackground: false,
        onUploadDone: (res) => console.log(res),
    };
    const picker = client.picker(options);
    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    openBtn.addEventListener('click', () => picker.open());
    closeBtn.addEventListener('click', () => picker.close());
});