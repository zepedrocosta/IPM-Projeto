import React, { useState } from 'react';

type Car = {
    url: string;
    brand: string;
    model: string;
    year: number;
    plate: string;
};

const initialCarList: Car[] = [
    {
        url: '/path/to/mustang.png',
        brand: 'FORD',
        model: 'MUSTANG MACH 1',
        year: 1969,
        plate: 'XX-01-XX',
    },
    {
        url: '/path/to/bmw.png',
        brand: 'BMW',
        model: '2002 Turbo',
        year: 1966,
        plate: 'XX-02-XX',
    },
    {
        url: '/path/to/fairlady.png',
        brand: 'NISSAN',
        model: 'FAIRLADY Z',
        year: 1970,
        plate: 'XX-03-XX',
    },
];

const CarList: React.FC = () => {
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

    return (
        <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '60px' }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '25px', 
                maxHeight: '80vh', 
                overflowY: 'auto', 
                paddingRight: '10px',
            }}>
                {carList.map((car, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #000',
                            borderRadius: '3px',
                            padding: '10px',
                            width: '300px',
                        }}
                    >
                        <img
                            src={car.url}
                            alt={`${car.brand} ${car.model}`}
                            style={{ width: '80px', height: '80px', marginRight: '10px' }}
                        />
                        <div style={{ width: '70%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '20px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{car.brand}</div>
                                <div style={{ fontSize: '20px' }}>{car.year}</div>
                            </div>
                            <div>{car.model}</div>
                            <div style={{ border: '1px solid #000', padding: '2px 4px', marginTop: '12px', width: 'fit-content' }}>
                                {car.plate}
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
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px dotted #000',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
                onClick={() => setShowPopup(true)}
            >
                +
            </button>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '300px',
                    }}>
                        <h3>Add New Car</h3>
                        <input
                            type="text"
                            name="url"
                            placeholder="Image URL"
                            value={newCar.url}
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            value={newCar.brand}
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <input
                            type="text"
                            name="model"
                            placeholder="Model"
                            value={newCar.model}
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <input
                            type="number"
                            name="year"
                            placeholder="Year"
                            value={newCar.year}
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <input
                            type="text"
                            name="plate"
                            placeholder="Plate"
                            value={newCar.plate}
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button onClick={handleAddCar} style={{ marginRight: '10px' }}>Add</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarList;
