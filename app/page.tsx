"use client";

import { useState, ChangeEvent } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import YAML from "yaml";

export default function Home() {
  const [json, setJson] = useState("");
  const [yaml, setYaml] = useState("");

  let changeJsonInput = (value: string, e: any) => {
    setJson(value);
    try {
      const jsonP = JSON.parse(value);
      setYaml(YAML.stringify(jsonP));
    } catch (ex: any) {
      console.log(ex);
      setYaml("Unable to parse JSON. " + ex.message);
    }
  };

  let changeYamlInput = (value: string, e: any) => {
    setYaml(value);
    try {
      const yamlP = YAML.parse(value);
      setJson(JSON.stringify(yamlP, null, 2));
    } catch (ex: any) {
      console.log(ex);
      setJson("Unable to parse YAML. " + ex.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center gap-4 p-4">
      <AceEditor
        mode="json"
        theme="monokai"
        value={json}
        onChange={changeJsonInput}
        name="json"
        editorProps={{ $blockScrolling: true }}
        className="flex-1"
      />

      <AceEditor
        mode="yaml"
        theme="monokai"
        value={yaml}
        onChange={changeYamlInput}
        name="yaml"
        editorProps={{ $blockScrolling: true }}
        className="flex-1"
      />
    </main>
  );
}
