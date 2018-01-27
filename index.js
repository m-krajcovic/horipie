exports.Chart = function(parent, chartName) {
    let total = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'horipie';
    parent.appendChild(wrapper);

    const chartTitle = document.createElement('div');
    chartTitle.className = 'chart-title-wrapper';
    wrapper.appendChild(chartTitle);

    const titleText = document.createElement('div');
    titleText.className = 'title';
    titleText.textContent = chartName;
    chartTitle.appendChild(titleText);

    const totalCount = document.createElement('div');
    totalCount.className = 'total-count';
    totalCount.textContent = '0 total';
    chartTitle.appendChild(totalCount);

    const chart = document.createElement('div');
    chart.className = 'chart';
    wrapper.appendChild(chart);

    const legend = document.createElement('div');
    legend.className = 'legend';
    wrapper.appendChild(legend);

    let bars = [];

    function refresh() {
        totalCount.textContent = total + ' total';
        bars.forEach(bar => {
            const percent = (bar.count / total) * 100;
            bar.barElement.style.width = percent + "%";
            bar.legendElement.innerHTML =
                `<div class="legend-item-name">${bar.name}</div>
      <span class="legend-item-count">${bar.count}</span>
      <span class="legend-item-percent" style="color: ${bar.color}">${Number(percent).toFixed(2)}%</span>`
        });
    }

    function bind(elements) {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                elements.forEach(e => {
                    e.classList.add('active');
                });
            });
            element.addEventListener('mouseleave', () => {
                elements.forEach(e => {
                    e.classList.remove('active');
                });
            });
        });
    }

    function createBar(name, count, color) {
        const barElement = document.createElement('div');
        barElement.className = 'bar';
        barElement.style.background = color;
        chart.appendChild(barElement);

        const legendElement = document.createElement('div');
        legendElement.className = 'legend-item';
        legendElement.style.borderColor = color;
        legend.appendChild(legendElement);

        bind([barElement, legendElement]);
        return {name, count, color, barElement, legendElement};
    }

    function reset() {
        total = 0;
        totalCount.textContent = '0 total';
        bars.forEach(bar => {
            chart.removeChild(bar.barElement);
            legend.removeChild(bar.legendElement);
        });
        bars = [];
    }

    return {
        total: () => {
            return total;
        },
        addBar: (name, count, color) => {
            total = total + count;
            bars.push(createBar(name, count, color));
            refresh();
        },
        addBars: (barsDesc) => {
            // barsDesc should be array of arrays [[name,count,color],...]
            barsDesc.forEach(bar => {
                total = total + bar[1];
                bars.push(createBar(bar[0], bar[1], bar[2]));
            });
            refresh();
        },
        setBars: (barsDesc) => {
            // barsDesc should be array of arrays [[name,count,color],...]
            reset();
            barsDesc.forEach(bar => {
                total = total + bar[1];
                bars.push(createBar(bar[0], bar[1], bar[2]));
            });
            refresh();
        },
        reset: reset
    }
};