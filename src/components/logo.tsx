import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-gradient-futuristic hover:opacity-90 transition-opacity duration-300">
      <span>USDA</span>.<span>money</span>
    </Link>
  );
}
