import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";

const withAuthAdmin = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { user } = useAuth();

    if (user && user.user && user.user.isAdmin) {
      return <Component {...props} />;
    } else {
      router.push("/auth/login");
      return null;
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuthAdmin;
