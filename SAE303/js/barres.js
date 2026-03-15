function drawGraphiqueBarres(containerId, inputData) {
    
    d3.select(containerId).html("");

    var margin = {top: 30, right: 30, bottom: 100, left: 60}, 
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var svg = d3.select(containerId)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var total = inputData.length;
    
    var causes = [
        { key: "q18_i1. Causes GES activités industrielles", label: "Industrie" },
        { key: "q18_i2. Causes GES transports", label: "Transport" },
        { key: "q18_i3. Causes GES bâtiments", label: "Chauffage" }, 
        { key: "q18_i4. Causes GES agriculture", label: "Agriculture" },
        { key: "q18_i7. Causes GES destruction des forêts", label: "Déforestation" }, 
        { key: "q18_i8. Causes GES centrales nucléaires", label: "Nucléaire" }
    ];

    var data = causes.map(function(c) {
        var count = inputData.filter(function(d) {
            var rep = d[c.key];
            return rep === "Beaucoup" || rep === "Assez";
        }).length;
        
        return {
            Country: c.label, 
            Value: (count / total) * 100 
        };
    });

    data.sort(function(b, a) {
        return a.Value - b.Value;
    });

    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.Country; }))
        .padding(0.2);
        
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", "12px");

    var y = d3.scaleLinear()
        .domain([0, 110]) 
        .range([ height, 0]);
        
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .text("% des réponses")
        .style("font-size", "11px");

    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.Country); })
            .attr("y", function(d) { return y(d.Value); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.Value); })
            .attr("fill", "#005e2f");

    svg.selectAll("myLabels")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) { return Math.round(d.Value) + "%"; }) 
        .attr("x", function(d) { return x(d.Country) + x.bandwidth() / 2; }) 
        .attr("y", function(d) { return y(d.Value) - 5; }) 
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#333");
}