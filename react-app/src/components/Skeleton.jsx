const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-gradient-to-r from-bg-secondary via-bg-tertiary to-bg-secondary bg-[length:200%_100%] rounded ${className}`} />
);

export const PageSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-24">
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <Skeleton className="h-10 w-64 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-bg-secondary/50 border border-border/50 rounded-3xl p-6">
                        <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                ))}
            </div>
            
            <div className="bg-bg-secondary border border-border rounded-3xl p-6 md:p-10">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-2 font-mono text-3xl leading-relaxed">
                    {Array(5).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default Skeleton;
