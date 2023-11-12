import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import RoutesContainer from "./routes";
import { useState } from "react";
import SearchContext from "./contexts/searchContext";
import NavbarContainer from "./components/navbar";


function App() {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="font-sans dark text-foreground bg-background h-auto min-h-screen">
      <NextUIProvider>
        <SearchContext.Provider value={{ search, setSearch }}>
          <NavbarContainer />
          <div className="">
            <RoutesContainer />
          </div>
          {/* <div className="mt-5 bg-zinc-900">
            <div className=" container mx-auto py-4">
              <p>
                Created By Deepanshu Goel
                </p>
            </div>
          </div> */}
        </SearchContext.Provider>
      </NextUIProvider>
    </div>
  );
}

export default App;
