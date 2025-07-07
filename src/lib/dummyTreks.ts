// dummyTreks.ts

export interface Trek {
    _id: string;
    title: string;
    thumbnail: string; 
    imageUrls: string[];
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
    seatsAvailable: number;
    commute: string;
    locationsToView: string[];
    aboutDestination: string;
    whoCanCome: string;
    stops: string[];
    schedule: string[];
    foodStops?: string[];
    highlights?: string[];
    description: string;
    suitableFor?: string;
    preparationTips?: string[];
    leaders?: Array<{
        name: string;
        photo: string;
        experience: string;
    }>;
    facilities?: string[];
}

interface DummyTreks {
    upcomingTreks: Trek[];
    popularTreks: Trek[];
    recentTreks: Trek[];
}

export const dummyTreks: DummyTreks = {
    upcomingTreks: [
        {
            _id: "1",
            title: "Valley of Flowers",
            thumbnail: "/treks/kedarkanth.jpg",
            imageUrls: [
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
            ],
            price: "₹6,499",
            startDate: "2025-06-24",
            endDate: "2025-06-30",
            difficulty: "Moderate",
            seatsAvailable: 15,
            commute: "Delhi → Rishikesh → Govindghat (Bus)",
            stops: ["Rishikesh", "Joshimath", "Govindghat", "Ghangaria"],
            schedule: [
                "Day 1: Delhi to Rishikesh",
                "Day 2: Rishikesh to Joshimath",
                "Day 3: Trek to Ghangaria",
                "Day 4: Valley of Flowers Exploration",
                "Day 5: Trek back",
                "Day 6: Return journey",
            ],
            foodStops: ["Rishikesh", "Joshimath", "Ghangaria"],
            highlights: [
                "Blooming alpine flowers",
                "River crossings",
                "Snow bridges",
            ],
            description:
                "A UNESCO World Heritage Site, Valley of Flowers is a must-visit for nature lovers and photographers. Surrounded by snow-clad peaks, it's famous for its vibrant floral diversity.",
            suitableFor: "Beginners, nature lovers, photographers",
            preparationTips: [
                "Carry rain gear",
                "Start cardio at least 2 weeks prior",
                "Good quality trekking shoes",
            ],
            leaders: [
                {
                    name: "Ravi Mehta",
                    photo: "/leaders/ravi.jpg",
                    experience: "Leads 30+ Himalayan treks",
                },
                {
                    name: "Sneha Joshi",
                    photo: "/leaders/sneha.jpg",
                    experience: "Certified in mountain rescue, 20+ treks led",
                },
            ],
            facilities: [
                "Trek guide",
                "First Aid",
                "Meals (Veg)",
                "Tent accommodation",
                "Commute from base city",
            ],
            locationsToView: ["Meadow trails", "Snow-covered peaks"],
            aboutDestination:
                "This trek takes you through lush green meadows, alpine forests, and offers majestic views of snow-capped peaks.",
            whoCanCome:
                "Suitable for solo travelers, families, and adventure seekers",
        },
        {
            _id: "2",
            title: "Hampta Pass",
            thumbnail: "/treks/kedarkanth.jpg",
            imageUrls: [
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
            ],
            price: "₹7,999",
            startDate: "2025-07-10",
            endDate: "2025-07-16",
            difficulty: "Moderate",
            seatsAvailable: 12,
            commute: "Manali → Jobra (Shared vehicle)",
            stops: [
                "Jobra",
                "Jwara",
                "Balu ka Ghera",
                "Hampta Pass",
                "Chandratal",
            ],
            schedule: [
                "Day 1: Manali arrival and briefing",
                "Day 2: Manali to Jobra, trek to Jwara",
                "Day 3: Trek to Balu ka Ghera",
                "Day 4: Hampta Pass crossing",
                "Day 5: Descend to Chatru and drive to Chandratal",
                "Day 6: Return to Manali",
            ],
            foodStops: ["Jobra", "Balu ka Ghera", "Chatru"],
            highlights: [
                "Glacier crossings",
                "River crossings",
                "High-altitude campsites",
            ],
            description:
                "Hampta Pass offers a stunning crossover trek from lush green valleys of Kullu to the barren landscapes of Spiti.",
            suitableFor: "Intermediate trekkers, photographers",
            preparationTips: [
                "Strength training",
                "Layered clothing for temperature drops",
            ],
            leaders: [
                {
                    name: "Amit Rawat",
                    photo: "/leaders/amit.jpg",
                    experience: "10 years experience, outdoor survival expert",
                },
            ],
            facilities: [
                "Certified trek guide",
                "First Aid",
                "All meals",
                "Tent & sleeping bags",
                "Commute",
            ],
            locationsToView: ["Meadow trails", "Snow-covered peaks"],
            aboutDestination:
                "This trek takes you through lush green meadows, alpine forests, and offers majestic views of snow-capped peaks.",
            whoCanCome:
                "Suitable for solo travelers, families, and adventure seekers",
        },
        {
            _id: "3",
            title: "Kedarkantha Trek",
            thumbnail: "/treks/kedarkanth.jpg",
            imageUrls: [
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
            ],
            price: "₹5,999",
            startDate: "2025-12-20",
            endDate: "2025-12-25",
            difficulty: "Easy",
            seatsAvailable: 20,
            commute: "Dehradun → Sankri (Shared vehicle)",
            stops: ["Sankri", "Juda Ka Talab", "Kedarkantha Base", "Summit"],
            schedule: [
                "Day 1: Dehradun to Sankri",
                "Day 2: Trek to Juda Ka Talab",
                "Day 3: Kedarkantha Base",
                "Day 4: Summit & return",
                "Day 5: Sankri to Dehradun",
            ],
            description:
                "A UNESCO World Heritage Site, Valley of Flowers is a must-visit for nature lovers and photographers. Surrounded by snow-clad peaks, it's famous for its vibrant floral diversity.",
            facilities: [
                "Guide",
                "Meals",
                "Camp gear",
                "Transport",
                "Emergency backup",
            ],
            locationsToView: ["Meadow trails", "Snow-covered peaks"],
            aboutDestination:
                "This trek takes you through lush green meadows, alpine forests, and offers majestic views of snow-capped peaks.",
            whoCanCome:
                "Suitable for solo travelers, families, and adventure seekers",
        },
    ],

    popularTreks: [
        {
            _id: "4",
            title: "Kedarkantha Trek",
            thumbnail: "/treks/kedarkanth.jpg",
            imageUrls: [
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
            ],
            price: "₹5,999",
            startDate: "2025-12-20",
            endDate: "2025-12-25",
            difficulty: "Easy",
            seatsAvailable: 20,
            commute: "Dehradun → Sankri (Shared vehicle)",
            stops: ["Sankri", "Juda Ka Talab", "Kedarkantha Base", "Summit"],
            schedule: [
                "Day 1: Dehradun to Sankri",
                "Day 2: Trek to Juda Ka Talab",
                "Day 3: Kedarkantha Base",
                "Day 4: Summit & return",
                "Day 5: Sankri to Dehradun",
            ],
            description:
                "A UNESCO World Heritage Site, Valley of Flowers is a must-visit for nature lovers and photographers. Surrounded by snow-clad peaks, it's famous for its vibrant floral diversity.",
            facilities: [
                "Guide",
                "Meals",
                "Camp gear",
                "Transport",
                "Emergency backup",
            ],
            locationsToView: ["Meadow trails", "Snow-covered peaks"],
            aboutDestination:
                "This trek takes you through lush green meadows, alpine forests, and offers majestic views of snow-capped peaks.",
            whoCanCome:
                "Suitable for solo travelers, families, and adventure seekers",
        },
        {
            _id: "5",
            title: "Hampta Pass",
            thumbnail: "/treks/kedarkanth.jpg",
            imageUrls: [
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
            ],
            price: "₹7,999",
            startDate: "2025-07-10",
            endDate: "2025-07-16",
            difficulty: "Moderate",
            seatsAvailable: 12,
            commute: "Manali → Jobra (Shared vehicle)",
            stops: [
                "Jobra",
                "Jwara",
                "Balu ka Ghera",
                "Hampta Pass",
                "Chandratal",
            ],
            schedule: [
                "Day 1: Manali arrival and briefing",
                "Day 2: Manali to Jobra, trek to Jwara",
                "Day 3: Trek to Balu ka Ghera",
                "Day 4: Hampta Pass crossing",
                "Day 5: Descend to Chatru and drive to Chandratal",
                "Day 6: Return to Manali",
            ],
            foodStops: ["Jobra", "Balu ka Ghera", "Chatru"],
            highlights: [
                "Glacier crossings",
                "River crossings",
                "High-altitude campsites",
            ],
            description:
                "Hampta Pass offers a stunning crossover trek from lush green valleys of Kullu to the barren landscapes of Spiti.",
            suitableFor: "Intermediate trekkers, photographers",
            preparationTips: [
                "Strength training",
                "Layered clothing for temperature drops",
            ],
            leaders: [
                {
                    name: "Amit Rawat",
                    photo: "/leaders/amit.jpg",
                    experience: "10 years experience, outdoor survival expert",
                },
            ],
            facilities: [
                "Certified trek guide",
                "First Aid",
                "All meals",
                "Tent & sleeping bags",
                "Commute",
            ],
            locationsToView: ["Meadow trails", "Snow-covered peaks"],
            aboutDestination:
                "This trek takes you through lush green meadows, alpine forests, and offers majestic views of snow-capped peaks.",
            whoCanCome:
                "Suitable for solo travelers, families, and adventure seekers",
        },
    ],

    recentTreks: [
        {
            _id: "6",
            title: "Valley of Flowers (May Batch)",
            thumbnail: "/treks/kedarkanth.jpg",
            imageUrls: [
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
                "/treks/kedarkanth.jpg",
            ],
            price: "₹6,499",
            startDate: "2025-05-15",
            endDate: "2025-05-21",
            difficulty: "Moderate",
            seatsAvailable: 10,
            commute: "Delhi → Rishikesh → Govindghat (Bus)",
            stops: ["Rishikesh", "Joshimath", "Govindghat", "Ghangaria"],
            schedule: [
                "Day 1: Delhi to Rishikesh",
                "Day 2: Rishikesh to Joshimath",
                "Day 3: Trek to Ghangaria",
                "Day 4: Valley of Flowers Exploration",
                "Day 5: Trek back",
                "Day 6: Return journey",
            ],
            foodStops: ["Rishikesh", "Joshimath", "Ghangaria"],
            highlights: [
                "Blooming alpine flowers",
                "River crossings",
                "Snow bridges",
            ],
            description:
                "A UNESCO World Heritage Site, Valley of Flowers is a must-visit for nature lovers and photographers. Surrounded by snow-clad peaks, it's famous for its vibrant floral diversity.",
            suitableFor: "Beginners, nature lovers, photographers",
            preparationTips: [
                "Carry rain gear",
                "Start cardio at least 2 weeks prior",
                "Good quality trekking shoes",
            ],
            leaders: [
                {
                    name: "Ravi Mehta",
                    photo: "/leaders/ravi.jpg",
                    experience: "Leads 30+ Himalayan treks",
                },
                {
                    name: "Sneha Joshi",
                    photo: "/leaders/sneha.jpg",
                    experience: "Certified in mountain rescue, 20+ treks led",
                },
            ],
            facilities: [
                "Trek guide",
                "First Aid",
                "Meals (Veg)",
                "Tent accommodation",
                "Commute from base city",
            ],
            locationsToView: ["Meadow trails", "Snow-covered peaks"],
            aboutDestination:
                "This trek takes you through lush green meadows, alpine forests, and offers majestic views of snow-capped peaks.",
            whoCanCome:
                "Suitable for solo travelers, families, and adventure seekers",
        },
    ],
};
