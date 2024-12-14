import { useState } from 'react';

const Search = ({ onSearch }) => {
    const [muni, setMuni] = useState('');
    const [dropdownMuni, setDropdownMuni] = useState([]); // Tracks filtered dropdown options

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

    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMuni(value);

        
        if (value.trim()) {
            const filtered = municipalities.filter((municipality) =>
                municipality.toLowerCase().startsWith(value.trim().toLowerCase())
            );
            setDropdownMuni(filtered);
        } else {
            setDropdownMuni([]); 
        }
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (muni.trim()) {
            onSearch(muni); 
            setMuni(''); 
            setDropdownMuni([]); 
        }
    };

    
    const handleSuggestionClick = (suggestion) => {
        setMuni(suggestion); 
        setDropdownMuni([]); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ position: "relative" }}>
                <input
                    type="text"
                    placeholder="Enter municipality"
                    value={muni}
                    onChange={handleInputChange}
                    required
                />
                {dropdownMuni.length > 0 && (
                    <ul>
                        {dropdownMuni.map((municipality, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(municipality)}
                            >
                                {municipality}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
