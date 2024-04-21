import React, { useEffect, useRef, useState } from "react";
import { ValueChangedEvent } from "@refinitiv-ui/elements/*";

import ComboBox from "../../../components/ComboBox";

function StatisticBreakdown() {
  const [runsByEnvironment, setRunsByEnvironment] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [run1, setRun1] = useState(null);
  const [run2, setRun2] = useState(null);

  return (
    <ef-tornado-chart primary="7+ hours" secondary="less than 7 hours">
        <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
        <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Singapore</ef-tornado-item>
        <ef-tornado-item primary-value="25" primary-label="25%" secondary-value="75" secondary-label="75%"
            highlighted>Global Average</ef-tornado-item>
        <ef-tornado-item primary-value="22" primary-label="22%" secondary-value="78" secondary-label="78%">United
            States</ef-tornado-item>
        <ef-tornado-item primary-value="10" primary-label="10%" secondary-value="90" secondary-label="90%">Britain</ef-tornado-item>
        <ef-tornado-item primary-value="5" primary-label="5%" secondary-value="95" secondary-label="95%">Finland</ef-tornado-item>
        <div slot="header">
            <h3>In loco parentis</h3>
            <p>How much time do you spend on average helping your child academically with their education* per week?</p>
        </div>
        <div slot="footer">
            <p>Source: The Varkey Foundation</p>
            <p>*Reading to them or helping with homework</p>
        </div>
    </ef-tornado-chart>
    );
}

export default StatisticBreakdown;
