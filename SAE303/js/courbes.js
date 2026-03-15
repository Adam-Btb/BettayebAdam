function drawgraphiquecourbes(containerId, inputData) {
    d3.select(containerId).html("");

    var margin = { top: 30, right: 30, bottom: 60, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var svg = d3.select(containerId)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var allWaves = ["Vague 01", "Vague 02", "Vague 03", "Vague 04", "Vague 05", "Vague 06", "Vague 07", "Vague 08", "Vague 09", "Vague 10"];
    
    var dataByWave = d3.nest()
        .key(function(d) { return d.Vague; })
        .entries(inputData);

    var answers = [
        "...ou bien une certitude pour la plupart des scientifiques ?",
        "...une hypothèse sur laquelle les scientifiques ne sont pas tous d'accord ?"
    ];
    
    var labels = ["Certitude", "Doute"];
    var colors = ["#005e2f", "#3498db"]; 

    var dataReady = labels.map(function(label, i) {
        return {
            name: label,
            values: allWaves.map(function(waveName) {
                var waveData = dataByWave.find(function(w) { return w.key === waveName; });
                var total = waveData ? waveData.values.length : 0;
                var count = 0;
                
                if (total > 0) {
                    count = waveData.values.filter(function(d) {
                        return d["q5. Certitude/hypothèse impact effet de serre"] === answers[i];
                    }).length;
                }
                
                return {
                    vague: waveName, 
                    value: total > 0 ? (count / total) * 100 : 0
                };
            })
        };
    });

    var x = d3.scalePoint()
      .domain(allWaves) 
      .range([ 0, width ]);
      
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text") 
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 50) 
        .text("Vagues d'enquête")
        .style("font-size", "12px");

    var y = d3.scaleLinear().domain( [0, 100]).range([ height, 0 ]);
    svg.append("g").call(d3.axisLeft(y));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -35)
        .attr("x", -height / 2)
        .text("% de la population");

    var color = d3.scaleOrdinal().domain(labels).range(colors);

    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.vague); }) 
            .y(function(d) { return y(d.value); })
            (d.values)
        })
        .attr("stroke", function(d){ return color(d.name) })
        .style("stroke-width", 3)
        .style("fill", "none");

    svg.selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return color(d.name) })
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.vague) } ) 
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 4)
        .attr("stroke", "white");
}