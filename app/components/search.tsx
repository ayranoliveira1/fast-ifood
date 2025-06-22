import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Search component that provides a search input field and a search button
const Search = () => {
  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar Restaurantes" />
      <Button size="icon">
        <SearchIcon size={20}></SearchIcon>
      </Button>
    </div>
  );
};

export default Search;
