import React, { useEffect, useRef, useState } from "react";

import { ValueChangedEvent } from "@refinitiv-ui/elements/*";
import ComboBox from "../../components/ComboBox";
import StatisticBreakdown from './partials/StatisticBreakdown';

function Comparator() {
  const [runsByEnvironment, setRunsByEnvironment] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [run1, setRun1] = useState(null);
  const [run2, setRun2] = useState(null);

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

            runsByEnvironmentLocal[run.environment][run.name] = [run];
        } catch {
            console.error("Error reading run: ", run);
        }
      });

      hasLoadedRuns.current = true;
      setSelectedEnvironment(Object.keys(runsByEnvironmentLocal)[0]);
      setRunsByEnvironment(runsByEnvironmentLocal);
    }
  });

  console.warn(runsByEnvironment[selectedEnvironment]);
  var environmentsComboboxData = [], run1ComboboxData = [], run2ComboboxData = [];
  if (hasLoadedRuns) {
    environmentsComboboxData = Object.keys(runsByEnvironment).map((environment, index) => { return {label: environment, value: environment, selected: selectedEnvironment == environment}});

    if (selectedEnvironment) {
        run1ComboboxData = Object.keys(runsByEnvironment[selectedEnvironment]).map((run) => { return {label: run, value: run, selected: run1 == run}});
        run2ComboboxData = Object.keys(runsByEnvironment[selectedEnvironment]).map((run) => { return {label: run, value: run, selected: run2 == run}});
    }
  }

  return (
    <div className="flex flex-col space-y-5">
        <ef-panel transparent class="flex flex-col grow p-0" spacing>
            {hasLoadedRuns.current && (
                <ef-panel class="self-end px-4 py-2 font-black">
                    Environment: 
                    <ComboBox className="ml-5" value={selectedEnvironment} data={environmentsComboboxData} />
                </ef-panel>
            )}
        </ef-panel>
        <ef-panel spacing class="grow">
            {hasLoadedRuns && selectedEnvironment && (
                <div className="flex flex-row">
                    <div className="w-1/2 text-center">
                        Run 1: <ComboBox className="ml-5" value={run1} data={run1ComboboxData} onChange={(e) => setRun1(e.detail.value)} />
                    </div>
                    <div className="w-1/2 text-center">
                        Run 2: <ComboBox className="ml-5" value={run2} data={run2ComboboxData} onChange={(e) => setRun2(e.detail.value)} />
                    </div>
                </div>
            )}
            {run1 && run2 && <StatisticBreakdown />}
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
