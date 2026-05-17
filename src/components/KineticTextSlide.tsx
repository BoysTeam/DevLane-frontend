interface KineticTextSlideProps {
  text: string;
  className?: string;
}

export default function KineticTextSlide({ text, className = '' }: KineticTextSlideProps) {
  const lines = text.split('\n');

  return (
    <div className={`overflow-hidden inline-block ${className}`}>
      {lines.map((line, index) => (
        <div
          key={`${line}-${index}`}
          className="inline-block w-full animate-kinetic-slide will-change-transform"
          style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
