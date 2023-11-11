import { createContext } from "react";

interface SearchContextData {
    search: string;
    setSearch: (search: string) => void;
}
const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export default SearchContext;