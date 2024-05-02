import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchForm() {
    const [searchStr, setSearchStr] = useState("");

    return (
        <div className="search-container"> 
            <CiSearch className="search-icon" />
            <input
                type="text"
                className="SearchInput"
                placeholder="Search"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
            />
        </div>
    );
}

export default SearchForm;