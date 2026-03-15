function drawNuages(containerId, inputData) {
    
    d3.select(containerId).html("");

    var margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 500 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var svg = d3.select(containerId)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var data = [];
    inputData.forEach(function(d) {
        var age = Number(d.age);
        var foyerString = d["s13. Nb membres foyer"];
        var foyer = parseInt(foyerString); 

        if (!isNaN(age) && !isNaN(foyer)) {
            data.push({ x: age, y: foyer });
        }
    });

    var x = d3.scaleLinear()
        .domain([15, 100])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("Âge")
        .style("font-size", "12px");

    var y = d3.scaleLinear()
        .domain([0, 8]) 
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -35)
        .attr("x", -height / 2)
        .text("Taille du foyer")
        .style("font-size", "12px");

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.x) + (Math.random() * 6 - 3); } )
          .attr("cy", function (d) { return y(d.y) + (Math.random() * 6 - 3); } )
          .attr("r", 3)
          .style("fill", "#005e2f")
          .style("opacity", 0.4) 
          .style("stroke", "none");
}