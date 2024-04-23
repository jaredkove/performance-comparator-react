import React, { useEffect, useRef, useState } from "react";
import { ValueChangedEvent } from "@refinitiv-ui/elements/*";

import ComboBox from "../../../components/ComboBox";
import { HeadToHeadComparison } from "../../../types/HeadToHeadComparison";

interface StatisticBreakdownProps {
    run1: any,
    run2: any
}

function StatisticBreakdown(props: StatisticBreakdownProps) {
    const [metrics, setMetrics] = useState([]);
    const { run1, run2 } = props;

    useEffect(() => {
        var loadedMetrics: HeadToHeadComparison[] = [];
        run1.metrics.forEach((metric) => {
            if (loadedMetrics[metric.name] == undefined) {
                const newMetric = new HeadToHeadComparison();
                newMetric.run1Value = metric.value;
                newMetric.unit = metric.unit;
                newMetric.lowerIsBetter = metric.lowerIsBetter;
                loadedMetrics[metric.name] = newMetric
                return;
            }
            console.error('IGNORING METRIC IN RUN 1 DATA, DUPLICATE DETECTED: ', metric);
        });

        run2.metrics.forEach((metric) => {
            var newMetric = loadedMetrics[metric.name];
            if (newMetric == undefined) {
                newMetric = new HeadToHeadComparison();
                newMetric.unit = metric.unit;
                newMetric.lowerIsBetter = metric.lowerIsBetter;
            }
            
            if (newMetric.run2Value == null) {
                newMetric.run2Value = metric.value;
                loadedMetrics[metric.name] = newMetric
                return;
            }
            console.error('IGNORING METRIC IN RUN 2 DATA, DUPLICATE DETECTED: ', metric);
        });

        Object.keys(loadedMetrics).forEach((key: string) => {
            var hydratedMetric = loadedMetrics[key];
            hydratedMetric.compare();
            loadedMetrics[key] = hydratedMetric;
        });

        const sorted = Object.entries(loadedMetrics).sort((a, b) => {
            if (a[1].run2DifferencePercentage == null) {
                return -1;
            }
            if (a[1].lowerIsBetter) {
                return a[1].run2DifferencePercentage < b[1].run2DifferencePercentage ? 1 : -1;
            }
            return a[1].run2DifferencePercentage > b[1].run2DifferencePercentage ? 1 : -1;
        });

        setMetrics(Object.fromEntries(sorted));

    }, [run1, run2]);

    return (
        <ef-tornado-chart primary={run1.name} secondary={run2.name} class="space-y-2 p-5">
            {Object.entries(metrics).map(metric =>
                 <ef-tornado-item 
                    primary-value={metric[1].run1DifferencePercentage ? (metric[1].run1DifferencePercentage * 3) : (metric[1].run1Value == undefined ? 100 : 0)} 
                    primary-label={metric[1].run1Label} 
                    secondary-value={metric[1].run2DifferencePercentage ? (metric[1].run2DifferencePercentage * 3) : (metric[1].run2Value == undefined ? 100 : 0)} 
                    secondary-label={metric[1].run2Label}
                    style={metric[1].isGood ? { "--primary-color": `#6678FF`, "--secondary-color": `#6678FF` } : { "--primary-color": `#F5475B`, "--secondary-color": `#F5475B` }}>{metric[0]}</ef-tornado-item>
            )}
            <div slot="header">
                <h3 className="text-2xl text-left">Head to head</h3>
                <p>Comparing the two runs directly:</p>
            </div>
            <div slot="footer">
                <p>Source: The Varkey Foundation</p>
                <p>*Reading to them or helping with homework</p>
            </div>
        </ef-tornado-chart>
    )

}

export default StatisticBreakdown;
