init();

function getPlot(otu) {

    
d3.json("samples.json", function(data) {
    JSONItems = data;
    //console.log(JSONItems);
    
    
    //var subject = data.samples.filter(s => s.id === otu)[0];
   //console.log(samples2);
    
    
    let subject = [];

    for (let index = 0; index < JSONItems.samples.length; index++) {
        if (JSONItems.samples[index].id == otu) {
            subject.push(JSONItems.samples[index]);
            var wfreqNum = JSONItems.metadata[index].wfreq;
            
        }
           
    }
    console.log(subject);
    

    console.log(wfreqNum);

    let otu_ids = subject[0].otu_ids;
    let sample_values = subject[0].sample_values;
    let otu_labels = subject[0].otu_labels;

    // console.log(sample_values);
    // console.log(otu_ids);
    // console.log(otu_labels)
//first plot, the bar graph

    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse().map(d => "OTU " + d),
        type: "bar",
        orientation: 'h',
                
    };

    var layout = {
        title: "Top 10 OTU"
        
    };

    var data = [trace1];

    Plotly.newPlot("bar", data,layout);
    
    //bubble chart

    var trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
           color: otu_ids, 
           colorscale: 'Greens',
          //opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
       
        }
      
    };
      
      var data2 = [trace2];
      
      var layout2 = {
        // title: 'Marker Size and Color',
        showlegend: false,
        // height: 600,
        // width: 600
      
    };
      
      Plotly.newPlot('bubble', data2, layout2);


//Guage Chart (BONUS) - meh

// Enter a speed between 0 and 180
var level = 90;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians) ;
//var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians );
var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
// Path: may have to change to create a better triangle
var mainPath = path1,
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 14, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
  rotation: 90,
  text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
  direction: 'clockwise',
  textinfo: 'text',
  textposition:'inside',
  marker: {colors: ['rgba(14, 127, 0, .5)','rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)','rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)','rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)','','','white']},
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  height: 400,
  width: 400,
  title: "Belly Button Washing Frequency",
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
// part of data to input
            // var traceGauge = {
            //     type: 'pie',
            //     showlegend: false,
            //     hole: 0.4,
            //     rotation: 90,
            //     values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
            //     text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            //     direction: 'clockwise',
            //     textinfo: 'text',
            //     textposition: 'inside',
            //     marker: {
            //     colors: ['rgba(14, 127, 0, .5)','rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)','rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)','rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)','','','white'],
            //     labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            //     hoverinfo: 'Belly Button Washing Frequency'
            //     }
            // }

            // // needle
            // var degrees = 50, radius = .9
            // var radians = degrees * Math.PI / 180
            // var x = -1 * radius * Math.cos(radians) * wfreqNum
            // var y = radius * Math.sin(radians)

            // var gaugeLayout = {
            //     shapes: [{
            //     type: 'line',
            //     x0: 0.5,
            //     y0: 0.5,
            //     x1: 0.6,
            //     y1: 0.6,
            //     line: {
            //         color: 'black',
            //         width: 3
            //     }
            //     }],
            //     title: 'Chart',
            //     xaxis: {visible: false, range: [-1, 1]},
            //     yaxis: {visible: false, range: [-1, 1]}
            // }

            // var dataGauge = [traceGauge]

            // Plotly.plot('gauge', dataGauge, gaugeLayout)


    });

}



function getInfo(otu)  
    {
        
        // let table = document.querySelector('table');

        d3.json("samples.json", function(data) 
        {
            JSONItems = data;
            submeta = JSONItems.metadata.filter(s =>s.id == otu);
        //console.log(submeta);
        //Object.entries(submeta[0]).forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
        
        d3.select('ul').selectAll("li").remove();
        Object.entries(submeta[0]).forEach(([key, value]) => 
            {
               d3.select('ul').append('li')
               .html(`${key} : ${value} <br/>`);
            
        
            


            });
                    
        });
    }





function optionChanged(id) 
    {
        getPlot(id);
        getInfo(id);
        
    }

//function will get subject IDS from JSON and populate HTML dropdown box - Called on load.
function init() 
    {
    
        let patients = document.getElementById('selDataset');
        //the section of the webpage were the dropdown code is located.

        //d3 json the file file, and old school loop it
        d3.json("samples.json", function(data) 
        {
            JSONItems = data;
            var pats = JSONItems.names;
            
                 
            for (let i = 0; i < pats.length; i++) 
            {
                var option = `<option>${pats[i]}</option>`
                patients.innerHTML += option;
            }
            
        }); 
        
        
    }