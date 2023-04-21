import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/userSlice";

function SearchBar(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  var userUrl = "http://localhost:8081/users/";

  const userIdRef = useRef(undefined);

  const handleSearch = async (event) => {
    event.preventDefault();
    const userId = userIdRef.current.value;
    const response = await fetch(userUrl + userId);
    const jsonData = await response.json();
    dispatch(addUser(jsonData));
    history.push("/results");
  };

  return (
    <div className="search_bar">
      <h1>Search Through the DB of Things</h1>
      <form className="search_bar_input" onSubmit={handleSearch}>
        <input
          type="text"
          id="userId"
          name="userId"
          placeholder="User Id"
          ref={userIdRef}
        />
        <button className="searchBar-Button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
