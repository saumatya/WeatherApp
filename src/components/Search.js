import { useState ,useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import "../styles/search.css"
const Search = ({ onSearch }) => {
    //const userLanguage = localStorage.getItem('i18nextLng') || 'en'; // Default to 'en' if no value found

    const [muni, setMuni] = useState('');
    const [dropdownMuni, setDropdownMuni] = useState([]); // Tracks filtered dropdown options
    const [municipalities, setMunicipalities] = useState([]); // State for storing municipalities from the API
    const { t } = useTranslation();
 
    useEffect(() => {        
        const fetchMunicipalities = async () => {
            try {
                const userLanguage = localStorage.getItem('i18nextLng') || 'en'; // Default to 'en' if no value found
                const response = await fetch(
                    `https://data.stat.fi/api/classifications/v2/classifications/kunta_1_20240101/classificationItems?content=data&meta=max&lang=${userLanguage}&format=json`
                );
                const data = await response.json();
                console.log(data);
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
    }, [localStorage.getItem('i18nextLng')]);
    
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
                    // placeholder="Enter municipality"
                    placeholder={t('searchPlaceholder')}
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
                <button type="submit">{t('search')}</button>
            {/* </div> */}
            
        </form>
    );
};

export default Search;
