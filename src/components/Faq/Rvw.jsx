
const REVIEWS = [
    {
        id: 1,
        name: 'Raj Kumawat',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQFu9Hy18wgHFw/profile-displayphoto-shrink_400_400/0/1702635617467?e=1728518400&v=beta&t=uZSiQmeoueK-91_Wi1Mpf8LroEzHXAt-j8qyqsdyIaM',
        review: `The VehiConnect Parking Tag is a lifesaver! It made tracking my car's location effortless and has already helped me during emergencies.`,
    },
    {
        id: 2,
        name: 'Om Prakash Saini',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQH4tfD2TaRGMg/profile-displayphoto-shrink_400_400/0/1701966395985?e=1728518400&v=beta&t=4g9hUIgyl7PKO2S9yKVsYblVtMB8wLTEc8ZObrkPz-c',
        review: `Highly recommend the VehiConnect Parking Tag. It's intuitive and easy to use, providing peace of mind with its real-time location tracking.`,
    },
    {
        id: 3,
        name: 'Diksha Khudia',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQFGsQn3JhMYZg/profile-displayphoto-shrink_400_400/0/1682175528578?e=1728518400&v=beta&t=ppQ7lhRoeUC3PhVZBoPkxaFoz28crB3MpibccYkVCG4',
        review: `The VehiConnect Parking Tag is an excellent investment. The ability to locate my car quickly in crowded places has been invaluable.`,
    },
    {
        id: 4,
        name: 'Monika Kumawat',
        avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHTsdnBbAmxww/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674626394536?e=1728518400&v=beta&t=0I0gcoCMQxhMXE6IKX7hsv71X_sjOKQGA3CZnMyF9c4',
        review: `I've been using the VehiConnect Parking Tag for a few weeks now, and it's been incredibly useful. It's a reliable tool for finding my car effortlessly.`,
    },
    {
        id: 5,
        name: 'Amit',
        avatar: 'https://i.pravatar.cc/150?img=33',
        review: `The VehiConnect Parking Tag exceeded my expectations. It's easy to set up, and the GPS functionality works perfectly, even in busy parking.`,
    },
    {
        id: 6,
        name: 'Simran',
        avatar: 'https://i.pravatar.cc/150?img=40',
        review: `Using the VehiConnect Parking Tag has been a great experience. It’s saved me so much time and frustration when searching for my vehicle.`,
    },
    {
        id: 7,
        name: 'Harsh',
        avatar: 'https://media.licdn.com/dms/image/D5603AQHOgkYvKPUU-g/profile-displayphoto-shrink_400_400/0/1720774586973?e=1728518400&v=beta&t=5M9fyy7n6xbaUpll5M5Wu_j7EAQxOq3aIRhL0olv55A',
        review: `The VehiConnect Parking Tag is a must-have for any driver. It’s highly effective in tracking and locating your vehicle with minimal effort.`,
    },
    {
        id: 8,
        name: 'Devendra',
        avatar: 'https://i.pravatar.cc/150?img=33',
        review: `I’m really impressed with the VehiConnect Parking Tag. It provides accurate location data and is incredibly user-friendly.`,
    },
    {
        id: 9,
        name: 'Vikram',
        avatar: 'https://i.pravatar.cc/150?img=55',
        review: `The VehiConnect Parking Tag is a fantastic product. It’s been reliable and efficient, helping me locate my car quickly every time.`,
    },
];


import React, { useState, useEffect } from 'react';


const Rvw = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    const updateItemsPerView = () => {
        if (window.innerWidth >= 1024) {
            setItemsPerView(3);
        } else {
            setItemsPerView(1);
        }
    };

    useEffect(() => {
        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);

        return () => {
            window.removeEventListener('resize', updateItemsPerView);
        };
    }, []);

    const totalItems = REVIEWS.length;
    const totalPages = Math.ceil(totalItems / itemsPerView);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    };

    return (
        <div className="relative w-full px-8 py-8 mx-auto max-w-screen-xl mt-20">
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className={`flex-shrink-0 ${itemsPerView === 1 ? 'w-full' : 'w-1/3'} p-5`}
                        >
                            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
                                <img
                                    fetchPriority="low"
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                />
                                <h3 className="text-lg font-semibold">{review.name}</h3>
                                <p className="text-sm text-gray-800 text-center">{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black font-extrabold text-3xl p-2 bg-white rounded-full"
                    onClick={prevSlide}
                >
                    ←
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black text-3xl font-extrabold p-2 bg-white rounded-full"
                    onClick={nextSlide}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default Rvw;
