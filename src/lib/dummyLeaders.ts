export interface Leader {
    id: string;
    name: string;
    imageUrl: string;
    treksLed: number;
    expertise: string[];
    bio: string;
    contact: {
        phone?: string;
        email?: string;
    };
    role: "Founder" | "Trek Leader";
}

export const dummyLeaders: Leader[] = [
    {
        id: "leader1",
        name: "Anjali Deshmukh",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 32,
        expertise: ["Sahyadri", "Emergency First Aid", "Navigation"],
        bio: "Anjali has been leading treks across the Sahyadris for 6+ years. A certified mountaineer and first responder, she believes in safety-first trekking.",
        contact: {
            email: "anjali@paaydal.com",
        },
        role: "Founder",
    },
    {
        id: "leader2",
        name: "Rohit Patil",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 20,
        expertise: ["Himalayas", "Snow Treks", "Team Coordination"],
        bio: "With deep experience in Himalayan terrain, Rohit ensures unforgettable adventures while maintaining group morale and safety.",
        contact: {
            phone: "+91-9876543210",
        },
        role: "Trek Leader",
    },
    {
        id: "leader3",
        name: "Sneha Kulkarni",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 27,
        expertise: ["Birdwatching", "Local Flora", "Cultural Tours"],
        bio: "Sneha brings treks to life with her storytelling and local knowledge. Passionate about biodiversity and conservation.",
        contact: {
            email: "sneha@paaydal.com",
            phone: "+91-9000011122",
        },
        role: "Trek Leader",
    },
    {
        id: "leader4",
        name: "Rohit Patil",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 20,
        expertise: ["Himalayas", "Snow Treks", "Team Coordination"],
        bio: "With deep experience in Himalayan terrain, Rohit ensures unforgettable adventures while maintaining group morale and safety.",
        contact: {
            phone: "+91-9876543210",
        },
        role: "Trek Leader",
    },
    {
        id: "leader5",
        name: "Sneha Kulkarni",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 27,
        expertise: ["Birdwatching", "Local Flora", "Cultural Tours"],
        bio: "Sneha brings treks to life with her storytelling and local knowledge. Passionate about biodiversity and conservation.",
        contact: {
            email: "sneha@paaydal.com",
            phone: "+91-9000011122",
        },
        role: "Trek Leader",
    },
    {
        id: "leader6",
        name: "Rohit Patil",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 20,
        expertise: ["Himalayas", "Snow Treks", "Team Coordination"],
        bio: "With deep experience in Himalayan terrain, Rohit ensures unforgettable adventures while maintaining group morale and safety.",
        contact: {
            phone: "+91-9876543210",
        },
        role: "Trek Leader",
    },
    {
        id: "leader7",
        name: "Sneha Kulkarni",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 27,
        expertise: ["Birdwatching", "Local Flora", "Cultural Tours"],
        bio: "Sneha brings treks to life with her storytelling and local knowledge. Passionate about biodiversity and conservation.",
        contact: {
            email: "sneha@paaydal.com",
            phone: "+91-9000011122",
        },
        role: "Trek Leader",
    },
    {
        id: "leader8",
        name: "Rohit Patil",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 20,
        expertise: ["Himalayas", "Snow Treks", "Team Coordination"],
        bio: "With deep experience in Himalayan terrain, Rohit ensures unforgettable adventures while maintaining group morale and safety.",
        contact: {
            phone: "+91-9876543210",
        },
        role: "Trek Leader",
    },
    {
        id: "leader9",
        name: "Sneha Kulkarni",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 27,
        expertise: ["Birdwatching", "Local Flora", "Cultural Tours"],
        bio: "Sneha brings treks to life with her storytelling and local knowledge. Passionate about biodiversity and conservation.",
        contact: {
            email: "sneha@paaydal.com",
            phone: "+91-9000011122",
        },
        role: "Trek Leader",
    },
    {
        id: "leader10",
        name: "Rohit Patil",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 20,
        expertise: ["Himalayas", "Snow Treks", "Team Coordination"],
        bio: "With deep experience in Himalayan terrain, Rohit ensures unforgettable adventures while maintaining group morale and safety.",
        contact: {
            phone: "+91-9876543210",
        },
        role: "Trek Leader",
    },
    {
        id: "leader11",
        name: "Sneha Kulkarni",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 27,
        expertise: ["Birdwatching", "Local Flora", "Cultural Tours"],
        bio: "Sneha brings treks to life with her storytelling and local knowledge. Passionate about biodiversity and conservation.",
        contact: {
            email: "sneha@paaydal.com",
            phone: "+91-9000011122",
        },
        role: "Trek Leader",
    },
    {
        id: "leader12",
        name: "Rohit Patil",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 20,
        expertise: ["Himalayas", "Snow Treks", "Team Coordination"],
        bio: "With deep experience in Himalayan terrain, Rohit ensures unforgettable adventures while maintaining group morale and safety.",
        contact: {
            phone: "+91-9876543210",
        },
        role: "Trek Leader",
    },
    {
        id: "leader13",
        name: "Sneha Kulkarni",
        imageUrl: "/treks/trekLeader.png",
        treksLed: 27,
        expertise: ["Birdwatching", "Local Flora", "Cultural Tours"],
        bio: "Sneha brings treks to life with her storytelling and local knowledge. Passionate about biodiversity and conservation.",
        contact: {
            email: "sneha@paaydal.com",
            phone: "+91-9000011122",
        },
        role: "Trek Leader",
    },
];
