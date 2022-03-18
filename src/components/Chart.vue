<template>
    <div class="chart">
        <div class="chart__graphic-wrapper">
            <div ref="graphic" id="graphic"></div>
        </div>
        <transition name="router" mode="in-out">
            <q-skeleton v-show="loading" class="chart__skeleton" animation-speed="500" />
        </transition>
    </div>
</template>
<script>
import {date} from "quasar";

export default {
    name: 'Chart',
    props: {
        data: {
            type: Object
        },
        loading: {
            type: Boolean
        },
        dates: {
            type: Object,
        },
        coinName: {
            type: String
        }
    },
    watch: {
        data(val, oldVal) {
            if (val) {
                this.prepareDataForPlotly(val)
            }
        }
    },
    methods: {
        prepareDataForPlotly (data = {}) {
            const chartLineNames = Object.keys(data);

            const linesMap = {
                prices: {
                    value: [],
                    date: []
                },
                market_caps: {
                    value: [],
                    date: []
                },
                // total_volumes: {
                //     value: [],
                //     date: []
                // }
            }

            chartLineNames.forEach(name => {
                if (name in linesMap) {
                    for (let i = 0; i < data[name].length; i++) {
                        const dateObj = new Date(data[name][i][0])
                        linesMap[name].value.push(data[name][i][1])
                        linesMap[name].date.push(date.formatDate(dateObj.getTime(), 'YYYY-MM-DD'))
                    }
                }
            })
            console.log(linesMap)

            const trace1 = {
                type: "scatter",
                mode: "lines",
                name: `Prices`,
                x: linesMap.prices.date,
                y: linesMap.prices.value,
                line: { color: '#17BECF' }
            }
            // const trace2 = {
            //     type: "scatter",
            //     mode: "lines",
            //     name: `Market caps`,
            //     x: linesMap.market_caps.date,
            //     y: linesMap.market_caps.value,
            //     line: { color: '#3e5c50' }
            // }
            //
            // const trace3 = {
            //     type: "scatter",
            //     mode: "lines",
            //     name: `Total volumes`,
            //     x: linesMap.total_volumes.date,
            //     y: linesMap.total_volumes.value,
            //     line: { color: '#3e5c50' }
            // }

            const lines = [trace1];
            const layout = {
                legend: {
                    x: 0,
                    y: -0.6
                },
                title: `Chart with prices of ${this.coinName}`,
                xaxis: {
                    autorange: true,
                    rangeselector: {
                        buttons: [
                            {
                                count: 1,
                                label: '1m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {
                                count: 6,
                                label: '6m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {step: 'all'}
                        ]
                    },
                    type: 'date'
                },
                yaxis: {
                    autorange: true,
                    type: 'linear'
                }
            };
            Plotly.newPlot(this.$refs.graphic || 'graphic', lines, layout, {
                displaylogo: false,
                responsive: true
            });
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/styles/chart';
</style>
