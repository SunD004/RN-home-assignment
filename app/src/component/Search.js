import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = ({ searchQuery, setSearchQuery, sendSearchRequest }) => {
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}
            onIconPress={sendSearchRequest}
            placeholder="Search a city... (Paris, London...)"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};

export default Search;