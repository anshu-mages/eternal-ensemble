import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
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
      <NavbarBrand className="flex gap-3 items-center">
        <Button
          color="default"
          className="font-bold text-inherit bg-transparent"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Eternal Ensable
        </Button>
        <Input
          placeholder="Search"
          width="500px"
          size="sm"
          onChange={handleSearch}
          value={search}
        />
      </NavbarBrand>

     
      <NavbarContent justify="end">
        <NavbarItem>
          <ArweaveConnectButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
 