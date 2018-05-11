$(function() {
  var setFileInput = $('.imgInput');
  var setFileImg = $('.imgView');
  var casualCosts = "";
  var initialPP = 7;

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
    recalc();
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
    $('#playing_count').text(++count);
  }

  var calc_pp = function(card_cost) {
    var now_pp = $('#remaining_pp').text();
    now_pp -= card_cost;
    $('#remaining_pp').text(now_pp);
  }

  var calc_damage = function() {
    var count = parseInt($('#playing_count').text());
    var damage = parseInt($('#damage').text());

    damage += count;

    $('#damage').text(damage);
  }

  var add_table = function(info) {
    var name = "<td>" + info.name + "</td>";
    $("#row1").append(name);
    $("#row1").append("<td rowspan=2>→</td>");

    var cost = "<td class=cost_cell>" + info.cost + "</td>";
    $("#row2").append(cost);

    casualCosts = casualCosts + info.cost;
    $("#casual_costs").text(casualCosts);
  }

  $("#prev_button").on('click', function() {
    $("#row1 td:last").remove();

    var latestName = $("#row1 td:last").text();
    var latestCost = $("#row2 td:last").text();

    $("#row1 td:last").remove();
    $("#row2 td:last").remove();

    var count = parseInt($('#playing_count').text());
    if (latestName === "リノセウス") {
      var damage = parseInt($('#damage').text());

      damage -= count;

      $('#damage').text(damage);
    }

    $('#playing_count').text(--count);

    var now_pp = parseInt($('#remaining_pp').text());
    now_pp += parseInt(latestCost);
    $('#remaining_pp').text(now_pp);

    casualCosts = casualCosts.slice(0, -1);
    $("#casual_costs").text(casualCosts);
  });

  $("#reset_button").on('click', function() {
    $("#row1 td").remove();
    $("#row2 td").remove();
    casualCosts = "";
    $("#casual_costs").text(casualCosts);
    $('#max_pp').val(initialPP);
    $('#remaining_pp').text(initialPP);
    $('#playing_count').text(0);
    $('#damage').text(0);
  });

  var recalc = function() {
    var arrayCost = casualCosts.split('');
    var pp = parseInt($('#remaining_pp').text());

    for (var i = 0; i < arrayCost.length; i++) {
      var cost = parseInt(arrayCost[i]);
      pp -= cost;
    }
    $('#remaining_pp').text(pp);
  }
});
