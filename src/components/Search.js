import {useState} from 'react';

const Search = ({onSearch}) => {
    const [muni, setMuni] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted municipality:", muni); 
        if (muni.trim()) {
            onSearch(muni);
            setMuni('')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter municipality"
            value={muni}
            onChange={(e) => setMuni(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

export default Search;