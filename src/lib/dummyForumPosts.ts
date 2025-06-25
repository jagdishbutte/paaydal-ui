export interface ForumPost {
    id: string;
    user: {
        id: string;
        name: string;
        profilePic: string;
    };
    trek: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: Comment[];
    createdAt: string;
}

export interface Comment {
    id: string;
    user: {
        id: string;
        name: string;
        profilePic: string;
    };
    message: string;
    createdAt: string;
}

export const dummyForumPosts: ForumPost[] = [
    {
        id: "post-1",
        user: {
            id: "user-1",
            name: "Aarav Mehta",
            profilePic: "/forum/aarav.jpg",
        },
        trek: "Kalsubai Sunrise Trek",
        content:
            "One of the most surreal experiences of my life. Cold wind. Campfire. And THAT view at 6am.",
        imageUrl: "/forum/kalsubai-post.jpg",
        likes: 34,
        comments: [
            {
                id: "c1",
                user: {
                    id: "user-2",
                    name: "Sanya Roy",
                    profilePic: "/forum/sanya.jpg",
                },
                message: "This looks incredible! Planning for next weekend 😍",
                createdAt: "2024-12-11T10:15:00Z",
            },
        ],
        createdAt: "2024-12-10T09:00:00Z",
    },
    {
        id: "post-2",
        user: {
            id: "user-3",
            name: "Rahul Iyer",
            profilePic: "/forum/rahul.jpg",
        },
        trek: "Valley of Flowers 2024",
        content:
            "Words can't describe this place. I felt like I was walking in a dream. Definitely coming back next season.",
        likes: 58,
        comments: [],
        createdAt: "2024-12-09T13:40:00Z",
    },
];
