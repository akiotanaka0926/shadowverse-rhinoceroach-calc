$(function() {
  var setFileInput = $('.imgInput');
  var setFileImg = $('.imgView');
  var casualCosts = "";

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
    $('#remaining_pp').text(pp);
  });

  $('.play').on('click', function() {
    var info = $(this).data('info');
    count_play();
    calc_pp(info.cost);
    add_table(info);

    if (info.name === "リノセウス") {
      calc_damage();
    }
  });

  var count_play = function() {
    var count = $('#playing_count').text();
    count++;
    $('#playing_count').text(count);
  }

  var calc_pp = function(card_cost) {
    var now_pp = $('#remaining_pp').text();
    now_pp -= card_cost;
    $('#remaining_pp').text(now_pp);
  }

  var calc_damage = function() {
    var count = parseInt($('#playing_count').text());
    var damage = parseInt($('#damage').text());

    damage = count + damage;

    $('#damage').text(damage);
  }

  var add_table = function(info) {
    var cell = $("#cards tbody tr:first td").length;

    $("#cards tbody tr").each(function(i) {
      if (i !== 1) {
        var name = "<td>" + info.name + "</td>";
        $(this).append(name);
        $(this).append("<td rowspan=2>→</td>");
      } else {
        var cost = "<td class=cost_cell>" + info.cost + "</td>";
        $(this).append(cost);
      }
    });
    casualCosts = casualCosts + info.cost;
    $("#casual_costs").text(casualCosts);
  }

});
