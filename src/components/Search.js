import {useState} from 'react';

const Search = ({onSearch}) => {
    const [muni, setMuni] = useState('');
    const municipalities = [
        "Akaa",
        "Alajärvi",
        "Alavieska",
        "Alavus",
        "Asikkala",
        "Askola",
        "Aura",
        "Brändö",
        "Eckerö",
        "Enonkoski",
        "Enontekiö",
        "Espoo"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted municipality:", muni); 
        if (muni.trim()) {
            onSearch(muni);
            setMuni('')
        }
    };

    return (
        // <form onSubmit={handleSubmit}>
        // <input
        // type="text"
        // placeholder="Enter municipality"
        // value={muni}
        // onChange={(e) => setMuni(e.target.value)}
        // />
        // <button type='submit'>Search</button>
        // </form>
        <form onSubmit={handleSubmit}>
            <select
                value={muni}
                onChange={(e) => setMuni(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select a municipality
                </option>
                {municipalities.map((municipality, index) => (
                    <option key={index} value={municipality}>
                        {municipality}
                    </option>
                ))}
            </select>
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;