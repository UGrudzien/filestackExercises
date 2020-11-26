window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'AuqOa26kQMWP7tBG91ZXAz';
  const client = filestack.init(apikey);
  const options = {
      displayMode: 'inline',
      container: '#inline',
      maxFiles: 20,
      fromSources:['video'],
      uploadInBackground: false,
      onUploadDone: (res) => console.log(res),
  };
  const picker = client.picker(options);
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  openBtn.addEventListener('click', () => picker.open());
  closeBtn.addEventListener('click', () => picker.close());
});