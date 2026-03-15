function drawHistogram(containerId, inputData) {
    d3.select(containerId).html("");

    var margin = {top: 5, right: 30, bottom: 50, left: 60},
        width = 600- margin.left - margin.right, 
        height = 300- margin.top - margin.bottom;

    var svg = d3.select(containerId)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var data = inputData;

    var x = d3.scaleLinear()
        .domain([15, 100])     
        .range([0, width]);
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
/* début de la zone du code généré par ChatGPT mais j'ai compris comment gérer le style et le texte*/
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .text("Âge des participants")
        .style("font-size", "18px")
        .style("fill", "#000000");
    /* fin de la zone du code généré par ChatGPT */
    var histogram = d3.histogram()
        .value(function(d) { return d.price; })   
        .domain(x.domain())  
        .thresholds(x.ticks(20)); 

    var bins = histogram(data);

    var y = d3.scaleLinear()
        .range([height, 0]);
        
    y.domain([0, 45]); 
    
    svg.append("g")
        .call(d3.axisLeft(y));

    /* début de la zone du code généré par ChatGPT mais j'ai compris*/
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)") 
        .attr("y", -margin.left + 15)    
        .attr("x", -height / 2)           
        .text("Nombre de personnes")
        .style("font-size", "18px")
        .style("fill", "#0000000");
    /* fin de la zone du code généré par ChatGPT */
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#005e2f");
}