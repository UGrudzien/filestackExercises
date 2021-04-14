window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'A2Xx0v3NRZiCOIQk275hAz';
  const client = filestack.init(apikey);
  const options = {
      displayMode: 'inline',
      container: '#inline',
      maxFiles: 20,
     
      uploadInBackground: false,
      onUploadDone: (res) => console.log(res),
  };
  const picker = client.picker(options);
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  openBtn.addEventListener('click', () => picker.open());
  closeBtn.addEventListener('click', () => picker.close());
});