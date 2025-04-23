import Link from "next/link";

export function AuthButton({
  children,
  href,
  onClick,
}: { children: React.ReactNode, href: string, onClick: () => void }) {
  return (
    <Link className='tw:flex tw:justify-center tw:text-md tw:m-4 tw:w-24 tw:bg-gray-500 tw:rounded-md tw:px-4 tw:py-2 tw:text-white' href={href} onClick={onClick}>
      {children}
    </Link>
  )
}
