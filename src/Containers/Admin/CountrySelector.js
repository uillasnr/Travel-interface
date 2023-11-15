import React, { useState, useEffect } from 'react';
import Flag from 'react-country-flags';
import api from "../../services/api";

const CountrySelector = ({ countryCode, onCountrySelect }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState('');
  
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await api.get(
                    `https://restcountries.com/v3.1/name/${searchTerm}`
                );
                setSearchResults(response.data);

            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        if (searchTerm) {
            fetchCountries();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        setSelectedCountryName(country.name.common);
        onCountrySelect(country.cca2); 
      };
    

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    placeholder=""
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:cyan focus:border-cyan-700"
                />
                {selectedCountry && (
                    <div className="absolute top-0 left-0 flex items-center h-full p-2">
                        <Flag
                            countryCode={selectedCountry.cca2}
                            svg
                            style={{
                                width: '30px',
                                height: '20px',
                                marginRight: '10px',
                            }}
                        />
                        <img
                            src={selectedCountry.flags.svg}
                            alt={`Flag of ${selectedCountry.name.common}`}
                            style={{
                                width: '30px',
                                height: '20px',
                                marginRight: '10px',
                            }}
                        />
                        <span>{selectedCountry.name.common}</span>
                    </div>
                )}
            </div>
            {selectedCountry ? null : (
                <div className="mt-2 max-h-40 overflow-y-auto">
                    {searchResults.map((country) => (
                        <div
                            key={country.cca2}
                            onClick={() => handleSelectCountry(country)}
                            className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${selectedCountry?.cca2 === country.cca2
                                    ? 'bg-blue-100'
                                    : 'bg-white'
                                }`}
                        >
                            <Flag
                                countryCode={country.cca2}
                                svg
                                style={{
                                    width: '30px',
                                    height: '20px',
                                    marginRight: '10px',
                                }}
                            />
                            <img
                                src={country.flags.svg}
                                alt={`Flag of ${country.name.common}`}
                                style={{
                                    width: '30px',
                                    height: '20px',
                                    marginRight: '10px',
                                }}
                            />
                            <span className="ml-2">
                                {country.name.common} - {country.cca2}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountrySelector;
