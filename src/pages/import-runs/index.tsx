import React, { useState } from "react";

import ProfileDialog from "../../components/ProfileDialog";

import Button from "../../components/Button";
import ComboBox from "../../components/ComboBox";
import TextField from "../../components/TextField";
import RadioButton from "../../components/RadioButton";
import ThemeSwitcher from "../../components/ThemeSwitcher";

import { ValueChangedEvent } from "@refinitiv-ui/elements/*";

function NewRun() {
  const [runName, setRunName] = useState("");
  const [runs, setRuns] = useState([]);
  const [selectedRun, setSelectedRun] = useState(0);

  const handleChange = e => {
    var filesLoaded = 0;
    const filesTotal = e.target.files.length;
    var loadingRuns: object[] = [];

    for (const file of e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = e => {
        loadingRuns.push(JSON.parse(e.target.result));
        filesLoaded++;
        if (filesLoaded == filesTotal) {
          //all files read and in array
          setRuns(loadingRuns);
        }
      };
    };
  };

  const saveRuns = () => {
    runs.forEach(run => {
      localStorage.setItem(run.name, JSON.stringify(run));
      window.location.reload();
    });
  }

  return (
    <div className="flex flex-row items-start wrap space-x-5 h-full">
      <ef-panel spacing class="flex flex-col space-y-2">
        <h1 className="text-xl mx-5">Import Run(s)</h1>
        <input type="file" onChange={handleChange} multiple />
      </ef-panel>
      {!!runs.length && (
        <ef-panel class="flex flex-col grow h-full p-2 space-y-2">
          <ef-tab-bar>
            {runs.map((run, index) => <ef-tab label={run.name} active={run.name == selectedRun} onClick={() => setSelectedRun(index)} />)}
          </ef-tab-bar>
          <div className="flex">
            <div className="font-black w-1/4">Environment:</div>
            <div className="w-1/4">{runs[selectedRun].environment ?? "!! MISSING !!"}</div>
            <div className="font-black w-1/4">Release:</div>
            <div className="w-1/4">{runs[selectedRun].release ?? "!! MISSING !!"}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold w-1/4">Start Date:</div>
            <div className="w-1/4">{runs[selectedRun].startDate ?? "!! MISSING !!"}</div>
            <div className="font-bold w-1/4">End Date:</div>
            <div className="w-1/4">{runs[selectedRun].endDate ?? "!! MISSING !!"}</div>
          </div>
          <ef-button class="self-end" icon="tick" textpos="before" onClick={() => saveRuns()}>Save Runs</ef-button>
        </ef-panel>
      )}
    </div>
    
  );
}

export default NewRun;
