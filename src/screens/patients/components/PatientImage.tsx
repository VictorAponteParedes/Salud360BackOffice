import { useEffect, useState } from "react";
import { User } from "lucide-react";

interface PatientImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const PatientImage = ({ src, alt, className }: PatientImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoaded) setHasError(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, [isLoaded]);

    if (hasError) {
        return (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="text-gray-500" size={48} />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
        />
    );
};
