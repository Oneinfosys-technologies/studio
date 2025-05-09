import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-gradient-primary hover:opacity-80 transition-opacity">
      USDA.money
    </Link>
  );
}
