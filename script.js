var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// In case of overriding 
var angle = 0;
function Graph() {
    this.radiusx = 0;
    this.radiusy = 0;
    this.r = 255 - 10;
    this.g = 255 - 20;
    this.b = 255 - 30;

    this.changeStart = function(value) {
        this.r = value;
    }
}

var graph = new Graph();
var graphList;
var graphColorCoefficients = [-1, -1, -1];
var graphList = [graph.r, graph.g, graph.b];
var shouldIColor;
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);
shouldIColor = !((graph.radiusx >= -20 && graph.radiusx <= 20) && graph.radiusy >= 760);
graph.changeStart(10);
setInterval(function() {
    graph.radius = Math.sin(angle);
    graph.radiusx = 100 * Math.cos(Math.log(angle)) * graph.radius * Math.cos(angle) + canvas.width / 2;
    graph.radiusy = 100 * Math.cos(Math.log(angle)) * graph.radius * Math.sin(angle) + canvas.height / 2;
    context.fillStyle = "rgb(" + graphList[0] + ", " + graphList[1] + ", " + graphList[2] + ")";
    context.fillRect(graph.radiusx + 10 * Math.log(angle), graph.radiusy + 10 * Math.log(angle), 10, 10);
    angle += Math.PI / 60;
    for (var i = 0; i < graphList.length; i++) {
        if (graphList[i] <= 0 && graphColorCoefficients[i] === -1|| graphList[i] >= 255 && graphColorCoefficients[i] === 1) {
            graphColorCoefficients[i] *= -1; 
        }
        graphList[i] += graphColorCoefficients[i]*0.5;
    }
}, 1000/60);