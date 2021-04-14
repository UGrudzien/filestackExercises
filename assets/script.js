function init() {
  var API_KEY = "A2Xx0v3NRZiCOIQk275hAz";
  var filestackClient = filestack.init(API_KEY);
  var button = document.getElementById("launcher");
  var originalURL = "https://cdn.filestackcontent.com/PFqwRdbRuqrYyAH5pOaI";

  button.onclick = function (event) {
    filestackClient
      .picker({
      onUploadDone: function (result) {
        console.log('done', result);
      },
      onFileUploadFailed: function (err) {
        console.log('failed', err);
      },
    }).crop(originalURL);
  };
}

window.onload = function () {
  init();
};