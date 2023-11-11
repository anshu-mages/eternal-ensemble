import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";
import ArweaveConnectButton from "./arweave-connect";
import SearchContext from "../contexts/searchContext";
import { useContext } from "react";





export default function NavbarContainer() {
  const { search, setSearch } = useContext(SearchContext);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };


  return (
    <Navbar maxWidth="full" className="container mx-auto" height={"75px"}>
       
      <NavbarBrand onClick={()=>{
        window.location.href = "/"
      }}>
        <p className="font-bold text-inherit">Eternal Ensable</p>
      </NavbarBrand>
        
      <NavbarContent className="hidden sm:flex gap-4">
        <Input
          placeholder="Search"
          width="300px"
          size="sm"
          onChange={handleSearch}
          value={search}
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ArweaveConnectButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
