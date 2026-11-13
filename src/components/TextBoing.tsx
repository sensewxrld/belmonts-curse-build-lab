import React from 'react';

interface TextBoingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  delay?: number;
}

export const TextBoing: React.FC<TextBoingProps> = ({
  text,
  className = '',
  as = 'h1',
  delay = 0
}) => {
  const Tag = as;
  const words = text.split(' ');

  return (
    <Tag className={`inline-block perspective-[1200px] ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.3em]">
          {word.split('').map((char, charIdx) => {
            const charDelay = delay + (wordIdx * 0.08) + (charIdx * 0.03);
            return (
              <span
                key={charIdx}
                className="inline-block transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-1 hover:text-gold-300 cursor-default"
                style={{
                  animation: `charEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${charDelay}s both`
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
};
