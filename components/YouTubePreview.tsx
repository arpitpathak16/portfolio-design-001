interface YouTubePreviewProps {
  videoId: string;
  title: string;
  className?: string;
  variant?: "standard" | "short";
}

export default function YouTubePreview({
  videoId,
  title,
  className = "",
  variant = "standard",
}: YouTubePreviewProps) {
  const thumbnail =
    variant === "short"
      ? `https://i.ytimg.com/vi/${videoId}/frame0.jpg`
      : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt={title}
        loading="lazy"
        decoding="async"
        className={className}
        onError={(e) => {
          e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-14 w-14 scale-90 items-center justify-center rounded-full border border-[#F5F0E8]/20
                     bg-[#080808]/60 transition-all duration-300 group-hover:scale-100
                     group-hover:border-[#D7D7D7] group-hover:bg-[#D7D7D7]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M5 3l9 5-9 5V3z"
              fill="#F5F0E8"
              className="transition-colors duration-300 group-hover:fill-[#080808]"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
