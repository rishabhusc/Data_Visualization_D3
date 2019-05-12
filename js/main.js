var allData = Array()
var teamListArrayHome = Array()
var teamListArrayAway = Array()
var teamListArray1 = Array()
var teamListArray2 = Array()
var teamListArray =Array()

d3.json("data/sampleData.json", function(error, data) { 
  console.log(data)
  data1 = getChartData(data,'value1')
  data2 = getChartData(data, 'value2')
  drawChart(data1,'aa' )
  drawChart(data2,'zz' )

  // 
});


function drawChart(data, elId_t) {
  let chartElement = document.getElementById(elId_t)
  let chartElementWidth = chartElement.offsetWidth
  // console.log(chartElementWidth)
  let margin = {top:10, right:0, bottom:20, left:40},
      width  = chartElementWidth - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom
  
  let svg = d3.select(chartElement)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))

  let chart = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
  var yScale = d3.scaleLinear()
      .range([height, 0])
  
  var xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.1)

  yScale.domain([0, d3.max(data, function(d){ return d["value"]; })+1])
  xScale.domain(data.map(function(d){ return d["key"]; }))
  
  chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return xScale(d["key"]); })
    .attr("y", function(d){ return yScale(d["value"]); })
    .attr("fill", "steelblue")
    .attr("height", function(d){ return height - yScale(d["value"]); })
    .attr("width", function(d){ return xScale.bandwidth(); })
    
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(d3.axisLeft(yScale))

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
    .call(d3.axisBottom(xScale))
  
   
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll(".textlabel")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "textlabel")
    .attr("x", function(d){ ww=xScale.bandwidth();return xScale(d["key"]) + ww/2; })
    .attr("y", function(d){ return yScale(d["value"]) -3; })
    .text(function(d){ return Math.round(d["value"]*100)/100; })
}

function getChartData(list, key) {
  let result = []
  list.forEach((item) => {
      if(key=='value1')
         result.push({key:item.name,value:item.values.value1})

       if (key=='value2')
       result.push({key:item.name,value:item.values.sub.value2})

  });
  // console.log(11,result)
 
  return result;
}


