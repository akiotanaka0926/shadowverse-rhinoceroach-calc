$(function() {
  var setFileInput = $('.imgInput');
  var setFileImg = $('.imgView');

  setFileInput.each(function() {
    var selfFile = $(this),
      selfInput = $(this).find('input[type=file]'),
      prevElm = selfFile.find(setFileImg),
      orgPass = prevElm.attr('src');

    selfInput.change(function() {
      var file = $(this).prop('files')[0],
        fileRdr = new FileReader();

      if (!this.files.length) {
        prevElm.attr('src', orgPass);
        return;
      } else {
        if (!file.type.match('image.*')) {
          prevElm.attr('src', orgPass);
          return;
        } else {
          fileRdr.onload = function() {
            prevElm.attr('src', fileRdr.result);
          }
          fileRdr.readAsDataURL(file);
        }
      }
    });
  });

  $('#max_pp').change(function() {
    var pp = $('#max_pp').val();
    if (pp < 1) pp = 1;
    else if (pp > 10) pp = 10;
    $('#max_pp').val(pp);
    $('#remiaing_pp').text(pp);
  });

  $('.play').on('click', function() {
    var info = $(this).data('info');
    alert(info.cost + ' ' + info.name);
  });

});
