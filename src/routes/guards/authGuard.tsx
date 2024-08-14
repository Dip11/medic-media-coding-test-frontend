import { type IComponent } from 'interfaces/component';
import { AuthProvider } from 'providers/auth';

const AuthGuard = ({ component }: IComponent) => {
  return (
    <>
      <AuthProvider>{component}</AuthProvider>
    </>
  );
};

export default AuthGuard;
