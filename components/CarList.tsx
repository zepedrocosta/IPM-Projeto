import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text } from 'react-native';

type Car = {
    url: string;
    brand: string;
    model: string;
    year: number;
    plate: string;
};

const initialCarList: Car[] = [
    {
        url: 'https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/AFLP9451-e1610749268461.jpg',
        brand: 'FORD',
        model: 'MUSTANG MACH 1',
        year: 1969,
        plate: 'XX-01-XX',
    },
    {
        url: 'https://silodrome.com/wp-content/uploads/2018/09/BMW-2002-Guide-1600x1138.jpg',
        brand: 'BMW',
        model: '2002 Turbo',
        year: 1966,
        plate: 'XX-02-XX',
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/1970-1973_Nissan_Fairlady_Z.jpg/1200px-1970-1973_Nissan_Fairlady_Z.jpg',
        brand: 'NISSAN',
        model: 'FAIRLADY Z',
        year: 1970,
        plate: 'XX-03-XX',
    },
];

type CarListProps = {
    searchQuery: string;
};

const CarList: React.FC<CarListProps> = ({ searchQuery }) => {
    const [carList, setCarList] = useState<Car[]>(initialCarList);
    const [showPopup, setShowPopup] = useState(false);
    const [newCar, setNewCar] = useState<Car>({
        url: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        plate: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCar((prevCar) => ({
            ...prevCar,
            [name]: name === 'year' ? parseInt(value) : value,
        }));
    };

    const handleAddCar = () => {
        setCarList((prevList) => [...prevList, newCar]);
        setShowPopup(false);
        setNewCar({ url: '', brand: '', model: '', year: new Date().getFullYear(), plate: '' });
    };

    const router = useRouter();

    const navigateToCarPage = () => {
        router.push('/car');
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCar((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const filteredCarList = carList.filter((car) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
            car.brand.toLowerCase().includes(lowercasedQuery) ||
            car.model.toLowerCase().includes(lowercasedQuery) ||
            car.plate.toLowerCase().includes(lowercasedQuery)
        );
    });

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {filteredCarList.length === 0 && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', // Ensure it takes full container height
                            textAlign: 'center', // Optional for multi-line messages
                            color: '#555', // Customize as needed
                        }}
                    >
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            No cars found
                        </p>
                        <p style={{ fontSize: '14px', color: '#777' }}>
                            Add a car to get started!
                        </p>
                    </div>
                )}

                {filteredCarList.map((car, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            padding: '16px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onClick={navigateToCarPage}
                    >
                        <img
                            src={car.url}
                            alt={`${car.brand} ${car.model}`}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '8px',
                                marginRight: '16px',
                                objectFit: 'cover',
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                }}
                            >
                                <span>{car.brand}</span>
                                <span style={{ color: '#555' }}>{car.year}</span>
                            </div>
                            <div style={{ color: '#777', fontSize: '16px', marginBottom: '8px' }}>{car.model}</div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                <div
                                    style={{
                                        padding: '4px 8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: '#f9f9f9',
                                        width: 'fit-content'
                                    }}
                                >
                                    {car.plate}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '50%',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => setShowPopup(true)}
            >
                +
            </button>

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '12px',
                            width: '320px',
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                                textAlign: 'center',
                                color: '#333',
                            }}
                        >
                            Add New Car
                        </h3>
                        <input
                            type="text"
                            name="url"
                            placeholder="Image URL"
                            value={newCar.url}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                fontSize: '16px',
                            }}
                        />
                        <select
                            name="brand"
                            value={newCar.brand}
                            onChange={handleModelChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                fontSize: '16px',
                            }}
                        >
                            <option value="" disabled>Select a brand</option>
                            {[
                                "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick",
                                "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dodge", "Ferrari", "Fiat", "Ford",
                                "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
                                "Land Rover", "Lexus", "Lincoln", "Maserati", "Mazda", "McLaren", "Mercedes-Benz",
                                "Mini", "Mitsubishi", "Nissan", "Peugeot", "Porsche", "Ram", "Renault", "Rolls-Royce",
                                "Saab", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"
                            ].map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="model"
                            placeholder="Model"
                            value={newCar.model}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                fontSize: '16px',
                            }}
                        />
                        <input
                            type="number"
                            name="year"
                            placeholder="Year"
                            value={newCar.year}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                fontSize: '16px',
                            }}
                        />
                        <input
                            type="text"
                            name="plate"
                            placeholder="Plate"
                            value={newCar.plate}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                fontSize: '16px',
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '16px',
                            }}
                        >
                            <button
                                onClick={handleAddCar}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    marginRight: '8px',
                                    cursor: 'pointer',
                                }}
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    marginLeft: '8px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarList;
