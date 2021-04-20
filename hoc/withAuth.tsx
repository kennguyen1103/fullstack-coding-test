import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { user } = useAuth();

    console.log(user);

    if (!user) {
      router.push("/auth/login");
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
