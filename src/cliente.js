let ctx = document.getElementById("chart").getContext('2d');

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, "#5bbeff");
gradientStroke.addColorStop(1, "#072146");

var gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
gradientBkgrd.addColorStop(0, "rgb(0, 68, 129, 0.1)");
gradientBkgrd.addColorStop(1, "rgb(25, 115, 184, 1)");

let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function () {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function () {
            ctx.save();
            ctx.shadowColor = 'rgb(81, 187, 235, 0.1)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 6;
            _stroke.apply(this, arguments)
            ctx.restore();
        }
    }
});




var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["28/9", "5/10", "12/10", "19/10", "26/10", "2/11", "9/11", "16/11"],
        datasets: [{
            label: "Income",
            backgroundColor: gradientBkgrd,
            borderColor: gradientStroke,
            data: [4000, 4300, 4250, 4150, 4300, 4250, 4150, 4500],
            pointBorderColor: "rgb(91, 190, 255)",
            pointBackgroundColor: "rgb(91, 190, 255)",
            pointBorderWidth: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: "rgb(91, 190, 255)",
            pointHoverBorderWidth: 4,
            pointRadius: 1,
            borderWidth: 5,
            pointHitRadius: 16,
        }]
    },

    // Configuration options go here
    options: {
        tooltips: {
            backgroundColor: '#fff',
            displayColors: false,
            titleFontColor: '#000',
            bodyFontColor: '#000'

        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return (value / 1000) + 'K';
                    }
                }
            }],
        }
    }
});

// particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;