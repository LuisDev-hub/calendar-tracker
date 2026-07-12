import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
// import "./App.css";
import { CalendarProvider } from "./AppContext";
import CalendarGrid from "./componets/CalendarGrid";
import SideMenu from "./componets/SideMenu";
import { MONTHS_NAMES } from "./constants/months";

import Test from "./Test";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  const months = MONTHS_NAMES.es;
  
  return (
    <main className="container">
      {/* <Test /> */}
      <CalendarProvider lang={'en'}>
        <SideMenu />
        <div className="calendar-main">
          {
            months.map((month, idx)=>
              <CalendarGrid date={new Date(2026, idx)}/>
            )
          }
        </div>
      </CalendarProvider>
    </main>
  );
}

export default App;
