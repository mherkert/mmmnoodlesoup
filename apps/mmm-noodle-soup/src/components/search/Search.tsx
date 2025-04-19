import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
} from "@headlessui/react";

const Search = () => {
  return (
    <Combobox>
      <div className="relative">
        <ComboboxInput
          placeholder="Find your new favourite recipe"
          className="w-full rounded-md py-2 px-2  text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white"
          //   displayValue={(person) => person?.name}
          //   onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <FontAwesomeIcon icon={faSearch} />
        </ComboboxButton>
      </div>
      {/* <ComboboxInput
        placeholder="My favorite recipe"
        className="w-full"
        icon={<FontAwesomeIcon icon={faSearch} />}
      />
      <ComboboxOptions>
        <ComboboxOption value="1" />
        <ComboboxOption value="2" />
      </ComboboxOptions> */}
    </Combobox>
  );
};

export default Search;
