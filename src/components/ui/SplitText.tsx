import { ElementType } from 'react';

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  fancy?: boolean;
  newLine?: boolean;
  wordClassName?: string;
  letterClassName?: string;
}

export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  id,
  fancy = false,
  newLine = false,
  wordClassName = '',
  letterClassName = '',
}: SplitTextProps) {
  const words = text.split(' ');

  return (
    // @ts-ignore
    <Tag id={id} className={className}>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className={`overflow-hidden text-nowrap ${newLine ? 'block leading-none' : 'inline-block'} ${wordClassName}`}
        >
          {Array.from(word).map((char, charIndex) => (
            <span
              key={`${char}-${wordIndex}-${charIndex}`}
              className={`split-letter inline-block translate-y-full opacity-0 will-change-transform ${fancy ? 'font-fancy' : ''} ${letterClassName}`}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && !newLine && (
            <span className="inline-block" aria-hidden="true">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
