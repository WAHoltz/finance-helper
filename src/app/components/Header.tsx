import { ProviderValue, UserAuth } from '../context/AuthContext';
import LinkButton from './LinkButton';
import { useState } from 'react';

export default function Header() {
  const { user, handleSignIn, handleSignOut } = UserAuth() as ProviderValue;
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);
  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <h1 className="h-8 text-2xl text-gray-300 font-bold">
            Finance Helper
          </h1>
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            className="block text-gray-500 focus:text-white focus:outline-none hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`px-2 pt-2 pb-4 sm:flex max-sm:w-full max-sm:bg-gray-900 max-sm:absolute ${isOpen ? 'block' : 'hidden'}`}
      >
        {user && (
          <>
            <LinkButton href="/home">Home</LinkButton>
            <LinkButton href="/incomes" className="mt-1 sm:mt-0 sm:ml-2">
              Incomes
            </LinkButton>
            <LinkButton href="/expenses" className="mt-1 sm:mt-0 sm:ml-2">
              Expenses
            </LinkButton>
          </>
        )}
        {user ? (
          <LinkButton
            href="/"
            className="mt-1 sm:mt-0 sm:ml-2"
            onClick={handleSignOut}
          >
            Log out
          </LinkButton>
        ) : (
          <LinkButton
            href="/home"
            className="mt-1 sm:mt-0 sm:ml-2"
            onClick={handleSignIn}
          >
            Log in
          </LinkButton>
        )}
      </div>
    </header>
  );
}
