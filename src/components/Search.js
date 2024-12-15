import { useState ,useEffect } from 'react';
import "../styles/search.css"
const Search = ({ onSearch }) => {
    const [muni, setMuni] = useState('');
    const [dropdownMuni, setDropdownMuni] = useState([]); // Tracks filtered dropdown options
    const [municipalities, setMunicipalities] = useState([]); // State for storing municipalities from the API

    //hardcoded municpalities list
    // const municipalities = [
    //     "Akaa",
    //     "Alajärvi",
    //     "Alavieska",
    //     "Alavus",
    //     "Asikkala",
    //     "Askola",
    //     "Aura",
    //     "Brändö",
    //     "Eckerö",
    //     "Enonkoski",
    //     "Enontekiö",
    //     "Espoo"
    // ];
    //https://data.stat.fi/api/classifications/v2/classifications/kunta_1_20240101/classificationItems?content=data&meta=max&lang=en&format=json

    useEffect(() => {
        // Fetch municipalities from the API when the component mounts
        const fetchMunicipalities = async () => {
            try {
                const response = await fetch(
                    'https://data.stat.fi/api/classifications/v2/classifications/kunta_1_20240101/classificationItems?content=data&meta=max&lang=en&format=json'
                );
                const data = await response.json();
                console.log(data);
                // Assuming API returns an array of municipalities under the "classificationItems"
                const municipalitiesList = data.map(item => ({
                    name: item.classificationItemNames[0].name,
                    code: item.code
                }));
                    
                setMunicipalities(municipalitiesList); 
            } catch (error) {
                console.error('Error fetching municipalities:', error);
            }
        };
        console.log(municipalities[0])
        console.log()
        fetchMunicipalities();
    }, []);
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMuni(value);

        
        if (value.trim()) {
            const filtered = municipalities.filter((municipality) =>
                municipality.name.toLowerCase().startsWith(value.trim().toLowerCase())
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
        setMuni(suggestion.name); 
        setDropdownMuni([]); 
        console.log(`Municipality: ${suggestion.name}, Code: ${suggestion.code}`);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className='input-container'>
                <input
                    type="text"
                    placeholder="Enter municipality"
                    value={muni}
                    onChange={handleInputChange}
                    required
                />
                {dropdownMuni.length > 0 && (
                    <ul className='dropdown'>
                        {dropdownMuni.map((municipality, index) => (
                            <li
                                key={municipality.code}
                                onClick={() => handleSuggestionClick(municipality)}
                            >
                                {municipality.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* <div className='search-button'> */}
                <button type="submit">Search</button>
            {/* </div> */}
            
        </form>
    );
};

export default Search;
