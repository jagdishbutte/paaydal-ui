import TrekGalleryPage from "@/components/gallery/TrekGalleryPage";
import { Metadata } from "next";

interface PageProps {
    params: {
        trekId: string;
    };
}

export const generateMetadata = ({ params }: PageProps): Metadata => {
    return {
        title: `Gallery - ${params.trekId.replace(/-/g, " ")}`,
        description: `Photos and memories from ${params.trekId.replace(
            /-/g,
            " "
        )} trek.`,
    };
};

export default function Page({ params }: PageProps) {
    return <TrekGalleryPage trekId={params.trekId} />;
}
