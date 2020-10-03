import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>Are you lost ? </p>
      <Link href="/">Press here to go to the landing page </Link>
    </div>
  );
}
