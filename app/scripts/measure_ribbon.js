(function() {
  window.bonnie || (window.bonnie = {});

  bonnie.viz || (bonnie.viz = {});

  bonnie.viz.MeasureRibbon = function() {
    var barHeight, height, my, order, width;
    width = 50;
    height = 50;
    barHeight = height / 5;
    order = ['NUMER', 'DENOM', 'IPP', 'DENEXCEP', 'DENEX'];
    my = function(selection) {
      return selection.each(function(data) {
        var svg;
        svg = d3.select(this).append('svg').attr('viewBox', "0 0 " + width + " " + height).attr('preserveAspectRatio', 'none');
        return svg.selectAll('rect').data(data).enter().append('rect').attr('width', width).attr('height', barHeight).attr('y', function(o) {
          return barHeight * _(order).indexOf(o.name);
        }).attr('class', function(o) {
          var result;
          result = o.expected ? o.actual === o.expected ? 'success' : 'fail' : o.actual ? 'absent' : 'none';
          return "" + (o.name.toLowerCase()) + " expectation-" + result;
        });
      });
    };
    my.width = function(w) {
      if (!w) {
        return width;
      }
      width = w;
      return my;
    };
    my.height = function(h) {
      if (!h) {
        return height;
      }
      height = h;
      return my;
    };
    return my;
  };

}).call(this);
