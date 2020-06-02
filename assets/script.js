window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'AEP4wtbDSsOlk6YJhoVEAz';
  const client = filestack.init(apikey);
  const options = {
      displayMode: 'inline',
      container: '#inline',
      maxFiles: 20,
      fromSources:['video','webcam','facebook','local_file_system','imagesearch',	
      'instagram',
      'googledrive',
      'dropbox'	,
      'audio'	,
      'box',
      'github',	
      'gmail',	
      'picasa',
      'onedrive',	
      'onedriveforbusiness'],
      uploadInBackground: false,
      onUploadDone: (res) => console.log(res),
  };
  const picker = client.picker(options);
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  openBtn.addEventListener('click', () => picker.open());
  closeBtn.addEventListener('click', () => picker.close());
});