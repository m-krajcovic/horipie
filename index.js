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

    const bars = [];

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

    return {
        total: () => {
            return total;
        },
        addBar: (name, count, color) => {
            total = total + count;

            const barElement = document.createElement('div');
            barElement.className = 'bar';
            barElement.style.background = color;
            chart.appendChild(barElement);

            const legendElement = document.createElement('div');
            legendElement.className = 'legend-item';
            legendElement.style.borderColor = color;
            legend.appendChild(legendElement);

            bind([barElement, legendElement]);
            bars.push({name, count, color, barElement, legendElement});
            refresh();
        },
        addBars: () => {

        }
    }
};