const LoadingSpinner = ({ fullscreen = true }) => {
    return (
        <div className={`flex items-center justify-center ${fullscreen ? 'min-h-screen bg-background dark:bg-dark-background' : ''}`}>
            <div className="relative w-20 h-20"> {/* Container for spinner and logo */}
                {/* Elegant spinning ring: primary color with a transparent top segment that spins */}
                <div className="w-full h-full border-2 border-primary dark:border-dark-primary border-t-transparent dark:border-t-transparent rounded-full animate-spin" />

                {/* Logo in the center, pulsing gently */}
                <img
                    src="/logo.png" // Assumes logo.png is in the public folder
                    alt="Company Logo" // More descriptive alt text
                    className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                />
                {/* Screen-reader text for accessibility */}
                <div className="sr-only">Loading, please wait...</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;