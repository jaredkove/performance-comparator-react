import React, { useEffect, useRef, useState } from "react";

import { ValueChangedEvent } from "@refinitiv-ui/elements/*";
import ComboBox from "../../components/ComboBox";
import StatisticBreakdown from "./partials/StatisticBreakdown";

function Comparator() {
  const [runsByEnvironment, setRunsByEnvironment] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [run1Name, setRun1Name] = useState(null);
  const [run2Name, setRun2Name] = useState(null);

  const hasLoadedRuns = useRef(false);

  useEffect(() => {
    if (!hasLoadedRuns.current) {
      const runs = allStorage();

      var runsByEnvironmentLocal: any[] = [];
      runs.forEach(localItem => {
        const run = JSON.parse(localItem);

        //run by environment
        try {
            if (runsByEnvironmentLocal[run.environment] == undefined) {
                runsByEnvironmentLocal[run.environment] = [];
            }

            runsByEnvironmentLocal[run.environment][run.name] = run;
        } catch {
            console.error("Error reading run: ", run);
        }
      });

      hasLoadedRuns.current = true;
      setSelectedEnvironment(Object.keys(runsByEnvironmentLocal)[0]);
      setRunsByEnvironment(runsByEnvironmentLocal);
    }
  }, [selectedEnvironment]);

  var environmentsComboboxData = [], run1ComboboxData = [], run2ComboboxData = [];
  if (hasLoadedRuns) {
    environmentsComboboxData = Object.keys(runsByEnvironment).map((environment, index) => { return {label: environment, value: environment, selected: selectedEnvironment == environment}});

    if (selectedEnvironment) {
        run1ComboboxData = Object.keys(runsByEnvironment[selectedEnvironment]).map((run) => { return {label: run, value: run, selected: run1Name == run}});
        run2ComboboxData = Object.keys(runsByEnvironment[selectedEnvironment]).map((run) => { return {label: run, value: run, selected: run2Name == run}});
    }
  }

  return (
    <div className="flex flex-col space-y-5">
        <ef-panel transparent class="flex flex-col grow p-0" spacing>
            {hasLoadedRuns.current && (
                <ef-panel class="self-end px-4 py-2 font-black">
                    Environment: 
                    <ComboBox className="ml-5" value={selectedEnvironment} data={environmentsComboboxData} onChange={(e) => setSelectedEnvironment(e.detail.value)} />
                </ef-panel>
            )}
        </ef-panel>
        <ef-panel spacing class="grow">
            {hasLoadedRuns && selectedEnvironment && (
                <div className="flex flex-row">
                    <div className="w-1/2 text-center">
                        Run 1: <ComboBox className="ml-5" value={run1Name} data={run1ComboboxData} onChange={(e) => setRun1Name(e.detail.value)} />
                    </div>
                    <div className="w-1/2 text-center">
                        Run 2: <ComboBox className="ml-5"  value={run2Name} data={run2ComboboxData} onChange={(e) => setRun2Name(e.detail.value)} />
                    </div>
                </div>
            )}
            {run1Name && run2Name && (
                <StatisticBreakdown run1={runsByEnvironment[selectedEnvironment][run1Name]} run2={runsByEnvironment[selectedEnvironment][run2Name]} />
            )}
        </ef-panel>
    </div>
    
  );
}

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

export default Comparator;
