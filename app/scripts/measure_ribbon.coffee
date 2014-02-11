window.bonnie ||= {}
bonnie.viz ||= {}
bonnie.viz.MeasureRibbon = ->
  width  = 50
  height = 50
  barHeight = height / 5
  order = ['NUMER', 'DENOM', 'IPP', 'DENEXCEP', 'DENEX']
  my = (selection) ->
    selection.each (data) ->
      svg = d3.select(this).append('svg')
        .attr('viewBox', "0 0 #{width} #{height}")
        .attr('preserveAspectRatio', 'none')
      svg.selectAll('rect').data(data).enter().append('rect')
        .attr('width', width)
        .attr('height', barHeight)
        .attr('y', (o) -> barHeight * _(order).indexOf(o.name))
        .attr('class', (o) ->
          result = if o.expected
            if o.actual is o.expected then 'success' else 'fail'
          else
            if o.actual then 'absent' else 'none'
          "#{o.name.toLowerCase()} expectation-#{result}")

  my.width = (w) ->
    return width unless w
    width = w
    my

  my.height = (h) ->
    return height unless h
    height = h
    my

  my
