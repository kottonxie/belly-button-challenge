function getPlots(id) {
    
        d3.json("samples.json").then (sampleData =>{
            console.log(sampleData)

            // for the x
            var sampleValues =  sampleData.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            // for the y
            var labels =  sampleData.samples[0].otu_labels.slice(0,10);
            console.log (labels)

        // get only top 10 otu ids for the plot OTU
            var top_OTU = (sampleData.samples[0].otu_ids.slice(0, 10)).reverse();

        // get the otu id's to the desired form for the plot
            var OTU_id = top_OTU.map(d => "OTU " + d);

         // get the top 10 labels for the plot
            var labels =  sampleData.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)

            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                markers: 'blue',
                color: 'blue',
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var bar_data = [trace];
    
            // set plots layout
            var bar_layout = {
                title: "Top 10 OTU IDs",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create bar chart
        Plotly.newPlot("bar", bar_data, bar_layout);

            // create bubble chart
            var trace1 = {
                x: sampleData.samples[0].otu_ids,
                y: sampleData.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampleData.samples[0].sample_values,
                    color: sampleData.samples[0].otu_ids
                },
                text:  sampleData.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            var bubble_layout = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            var bubble_data = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", bubble_data, bubble_layout); 
        
        });
    }  
    // create the function to get the necessary data
    function getDemoInfo(id) {

        // read the json file to get data
        d3.json("samples.json").then((data)=> {

            // get the metadata info for the demo
            var metadata = data.metadata;
    
          // filter metadata by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];

          // select demo panel!
           var demographicInfo = d3.select("#sample-metadata");
            
            // empty the demographic panel every time function is called
           demographicInfo.html("");
    
            // grab and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // initialize
    function init() {

        // dropdown
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get data for dropdown names
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // Call functions
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();