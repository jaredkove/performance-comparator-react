import React, { useEffect, useRef, useState } from "react";
import { ValueChangedEvent } from "@refinitiv-ui/elements/*";

import ComboBox from "../../../components/ComboBox";

interface StatisticBreakdownProps {
    run1: any,
    run2: any
}

function StatisticBreakdown(props: StatisticBreakdownProps) {
    const [metrics, setMetrics] = useState([]);
    const { run1, run2 } = props;

    useEffect(() => {
        var loadedMetrics = [];
        run1.metrics.forEach((metric) => {
            if (loadedMetrics[metric.name] == undefined) {
                loadedMetrics[metric.name] = {
                    run1Value: metric.value,
                    run1Label: null,
                    run1DifferencePercentage: null,
                    run2Value: null,
                    run2Label: null,
                    run2DifferencePercentage: null,
                    unit: metric.unit,
                    lowerIsBetter: metric.lowerIsBetter
                }
                return;
            }
            console.error('IGNORING METRIC IN RUN 1 DATA, DUPLICATE DETECTED: ', metric);
        });

        run2.metrics.forEach((metric) => {
            console.warn('metric:', metric);
            if (loadedMetrics[metric.name] == undefined) {
                loadedMetrics[metric.name] = {
                    run2Value: metric.value,
                    run2Label: `${metric.value}${metric.unit}`,
                    run2DifferencePercentage: null,
                    unit: metric.unit,
                    lowerIsBetter: metric.lowerIsBetter
                }
                return;
            } else if (loadedMetrics[metric.name].run2Value == null) {
                
            }
            console.error('IGNORING METRIC IN RUN 2 DATA, DUPLICATE DETECTED: ', metric);
        });

    }, [run1, run2]);

    return (
        <ef-tornado-chart primary={run1.name} secondary={run2.name} class="space-y-2 p-5">
            <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
            <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Singapore</ef-tornado-item>
            <ef-tornado-item primary-value="25" primary-label="25%" secondary-value="75" secondary-label="75%"
                highlighted>Global Average</ef-tornado-item>
            <ef-tornado-item primary-value="22" primary-label="22%" secondary-value="78" secondary-label="78%">United
                States</ef-tornado-item>
            <ef-tornado-item primary-value="10" primary-label="10%" secondary-value="90" secondary-label="90%">Britain</ef-tornado-item>
            <ef-tornado-item primary-value="5" primary-label="5%" secondary-value="95" secondary-label="95%">Finland</ef-tornado-item>
            <div slot="header">
                <h3 className="text-2xl text-left">Head to head</h3>
                <p>Comparing the two runs directly:</p>
            </div>
            <div slot="footer">
                <p>Source: The Varkey Foundation</p>
                <p>*Reading to them or helping with homework</p>
            </div>
        </ef-tornado-chart>);
}

export default StatisticBreakdown;
