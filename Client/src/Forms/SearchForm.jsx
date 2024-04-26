import { useState } from "react";


function SearchForm() {
    const [searchStr, setSearchStr] =useState('');

    return(
        <input type="text" className="SearchBox option"/>
    )
}

export default SearchForm;