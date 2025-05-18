import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function LinkButton({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      className={twMerge(
        'block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800',
        className
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
