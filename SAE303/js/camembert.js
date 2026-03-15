function drawCamembert(containerId, inputData) {
    
    d3.select(containerId).html("");

    var width = 600, 
        height = 350,
        margin = 40;

    var radius = Math.min(width - 200, height) / 2 - margin;

    var svg = d3.select(containerId)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + ((width - 200) / 2) + "," + height / 2 + ")");

    var counts = {};
    var total = 0;

    inputData.forEach(function(d) {
        var mode = d["s22. Mode de transport"];
        if (mode) {
            if (mode.includes("voiture")) mode = "Voiture";
            else if (mode.includes("commun")) mode = "Transports en commun";
            else if (mode.includes("vélo")) mode = "Vélo";
            else if (mode.includes("pied")) mode = "Marche";
            else if (mode.includes("Deux roues")) mode = "Moto/Scooter";
            
            counts[mode] = (counts[mode] || 0) + 1;
            total++;
        }
    });

    var data = d3.entries(counts);

    var color = d3.scaleOrdinal()
      .domain(data.map(d => d.key))
      .range(["#d9534f", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#95a5a6"]);

    var pie = d3.pie()
      .value(function(d) { return d.value; });
    var data_ready = pie(data);

    var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.8);

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ 
          var percent = (d.data.value / total) * 100;
          return percent > 5 ? Math.round(percent) + "%" : ""; 
      })
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 14)
      .style("font-weight", "bold")
      .style("fill", "white");

    var legend = d3.select(containerId).select("svg")
        .append("g")
        .attr("transform", "translate(" + (width - 190) + "," + 50 + ")"); 

    legend.selectAll("myLegendSquares")
        .data(data_ready)
        .enter()
        .append("rect")
            .attr("x", 0)
            .attr("y", function(d, i){ return i * 25; })
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", function(d){ return color(d.data.key); });

    legend.selectAll("myLegendLabels")
        .data(data_ready)
        .enter()
        .append("text")
            .attr("x", 20)
            .attr("y", function(d, i){ return i * 25 + 12; })
            .text(function(d){ return d.data.key; }) 
            .style("font-size", "13px")
            .style("alignment-baseline", "middle");
}