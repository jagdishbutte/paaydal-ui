export interface TrekGalleryItem {
    id: string;
    title: string;
    date: string;
    totalMembers: number;
    images: {
        url: string;
        uploadedBy: string;
    }[];
}

export const dummyGalleryTreks: TrekGalleryItem[] = [
    {
        id: "valley-of-flowers-2024",
        title: "Valley of Flowers",
        date: "2024-07-15",
        totalMembers: 24,
        images: [
            {
                url: "/treks/trekGallary.jpg",
                uploadedBy: "Anjali Deshmukh",
            },
            {
                url: "/treks/trekGallary.jpg",
                uploadedBy: "Rohit Patil",
            },
        ],
    },
    {
        id: "rajgad-night-trek-2024",
        title: "Rajgad Night Trek",
        date: "2024-03-10",
        totalMembers: 18,
        images: [
            {
                url: "/treks/trekGallary.jpg",
                uploadedBy: "Sneha Kulkarni",
            },
            {
                url: "/treks/trekGallary.jpg",
                uploadedBy: "Local Guide",
            },
        ],
    },
    {
        id: "kedarkantha-snow-2025",
        title: "Kedarkantha Snow Trek",
        date: "2025-01-05",
        totalMembers: 30,
        images: [
            {
                url: "/treks/trekGallary.jpg",
                uploadedBy: "Rohit Patil",
            },
            {
                url: "/treks/trekGallary.jpg",
                uploadedBy: "Yash Mehta",
            },
        ],
    },
];
