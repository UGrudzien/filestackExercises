window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'A2Xx0v3NRZiCOIQk275hAz';
  const client = filestack.init(apikey);
  var originalURL = "https://cdn.filestackcontent.com/PFqwRdbRuqrYyAH5pOaI";

  const options = {
      displayMode: 'inline',
      container: '#inline',
      maxFiles: 20,
     
      uploadInBackground: false,
      onUploadDone: function (result) {
        console.log('done', result);
      },
      onFileUploadFailed: function (err) {
        console.log('failed', err);
      },
      // onUploadDone: (res) => console.log(res),
  };
  const picker = client.picker(options);
  picker.crop(originalURL)
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  openBtn.addEventListener('click', () => picker.open());
  closeBtn.addEventListener('click', () => picker.close());
});