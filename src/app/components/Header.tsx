import { ProviderValue, UserAuth } from '../context/AuthContext';
import { AuthButton } from './AuthButton';

export function Header() {
  const { user, handleSignIn, handleSignOut } = UserAuth() as ProviderValue;

  return (
    <div className="tw:grid-cols-8 tw:grid gap-4 tw:w-full tw:border-b-2 tw:h-20">
      <div className="tw:flex tw:flex-row tw:items-center tw:justify-center tw:col-start-4 tw:col-span-2 tw:text-3xl tw:text-white tw:font-bold">
        Finance Helper
      </div>
      {user ? (
        <div className="tw:flex tw:items-center tw:justify-end tw:col-start-7 tw:col-span-2 tw:mr-4">
          <div className="tw:flex tw:flex-row tw:items-center">
            <div className="tw:text-white tw:text-xl">
              Hello, {user?.displayName}
            </div>
            <AuthButton href="/" onClick={handleSignOut}>
              Log out
            </AuthButton>
          </div>
        </div>
      ) : (
        <div className="tw:items-center tw:col-start-8 tw:flex tw:justify-end tw:mr-4">
          <AuthButton href="/home" onClick={handleSignIn}>
            Log in
          </AuthButton>
        </div>
      )}
    </div>
  );
}
