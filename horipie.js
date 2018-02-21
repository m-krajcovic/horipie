'use strict';

function Horipie(parent, chartName) {
    var _total = 0;

    var wrapper = document.createElement('div');
    wrapper.className = 'horipie';
    parent.appendChild(wrapper);

    var chartTitle = document.createElement('div');
    chartTitle.className = 'chart-title-wrapper';
    wrapper.appendChild(chartTitle);

    var titleText = document.createElement('div');
    titleText.className = 'title';
    titleText.textContent = chartName;
    chartTitle.appendChild(titleText);

    var totalCount = document.createElement('div');
    totalCount.className = 'total-count';
    totalCount.textContent = '0 total';
    chartTitle.appendChild(totalCount);

    var chart = document.createElement('div');
    chart.className = 'chart';
    wrapper.appendChild(chart);

    var legend = document.createElement('div');
    legend.className = 'legend';
    wrapper.appendChild(legend);

    var bars = [];

    function refresh() {
        totalCount.textContent = _total + ' total';
        bars.forEach(function (bar) {
            var percent = bar.count / _total * 100;
            bar.barElement.style.width = percent + "%";
            bar.legendElement.innerHTML = '<span style="background: ' + bar.color + '" class="legend-item-line"></span>\n                <span class="legend-item-details"><div class="legend-item-name">' + bar.name + '</div>\n                <span class="legend-item-percent" style="color: ' + bar.color + '">' + Number(percent).toFixed(2) + '%</span>\n                <span class="legend-item-count">' + bar.count + '</span><span>';
        });
    }

    function bind(elements) {
        elements.forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                elements.forEach(function (e) {
                    e.classList.add('active');
                });
            });
            element.addEventListener('mouseleave', function () {
                elements.forEach(function (e) {
                    e.classList.remove('active');
                });
            });
        });
    }

    function createBar(name, count, color) {
        var barElement = document.createElement('div');
        barElement.className = 'bar';
        barElement.style.background = color;
        chart.appendChild(barElement);

        var legendElement = document.createElement('div');
        legendElement.className = 'legend-item';
        legend.appendChild(legendElement);

        bind([barElement, legendElement]);
        return { name: name, count: count, color: color, barElement: barElement, legendElement: legendElement };
    }

    function reset() {
        _total = 0;
        totalCount.textContent = '0 total';
        bars.forEach(function (bar) {
            chart.removeChild(bar.barElement);
            legend.removeChild(bar.legendElement);
        });
        bars = [];
    }

    return {
        total: function total() {
            return _total;
        },
        addBar: function addBar(name, count, color) {
            _total = _total + count;
            bars.push(createBar(name, count, color));
            refresh();
        },
        addBars: function addBars(barsDesc) {
            // barsDesc should be array of arrays [[name,count,color],...]
            barsDesc.forEach(function (bar) {
                _total = _total + bar[1];
                bars.push(createBar(bar[0], bar[1], bar[2]));
            });
            refresh();
        },
        setBars: function setBars(barsDesc) {
            // barsDesc should be array of arrays [[name,count,color],...]
            reset();
            barsDesc.forEach(function (bar) {
                _total = _total + bar[1];
                bars.push(createBar(bar[0], bar[1], bar[2]));
            });
            refresh();
        },
        reset: reset
    };
}

module.exports = Horipie;
