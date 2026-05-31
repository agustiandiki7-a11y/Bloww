import { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number; // percentage
  size: number; // size in px
  delay: number; // delay in s
  duration: number; // duration in s
  opacity: number;
}

export default function HeartsBackground() {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate static list of background floating hearts to prevent infinite triggers
    const generated: HeartParticle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // horizontal random position
      size: Math.floor(Math.random() * 20) + 12, // size between 12px and 32px
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15, // 15 to 30s for ultra-slow elegant glide
      opacity: Math.random() * 0.3 + 0.1, // subtle soft look
    }));
    setParticles(generated);
  }, []);

  return (
    <div id="hearts-bg" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(105vh) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opac);
          }
          90% {
            opacity: var(--opac);
          }
          100% {
            transform: translateY(-10vh) scale(1) rotate(180deg);
            opacity: 0;
          }
        }
        .bouncing-heart {
          animation: float-up var(--dur) linear infinite;
          animation-delay: var(--delay);
          opacity: 0;
        }
      `}</style>

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bouncing-heart text-pink-300"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            WebkitStyle: `float-up`,
            // @ts-ignore
            '--dur': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--opac': p.opacity,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
