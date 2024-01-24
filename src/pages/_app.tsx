import react, { useEffect, useState } from "react";
import FullLayout from "@/components/layouts/FullLayout";
import "@/styles/globals.css";
import "@/styles/style.scss";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { RootState, persistore, wrapper } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import ApiFeature from "@/Api/ApiFeature";
import "react-confirm-alert/src/react-confirm-alert.css";
import ActionFeature from "@/Api/ActionFeature";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  const [pageLoading, setPageLoading] = useState(false);
  const [Auth, setAuth] = useState(false);
  const token = useSelector(
    (state: RootState) => state?.login?.userToken?.token
  );

  useEffect(() => {
    setPageLoading(true);
    setAuth(true);
    if (token && path !== "/login" && path !== "/register" && path !== "/") {
      router.push("/login");
    } else if (
      token &&
      (path === "/login" || path === "/register" || path === "/")
    ) {
      router.push("/dashboard");
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token, path, router]);

  useEffect(() => {
    setPageLoading(true);
  }, []);

  // configure ApiFeature and ActionFeature
  ApiFeature.config = {
    router: router,
    dispatch: dispatch,
    token: token || "",
  };
  ActionFeature.config = {
    dispatch,
  };

  if (Auth && Auth) {
    return null;
  } else {
    return (
      <>
        <Toaster position="top-right" />
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY || ""}
        >
          <PersistGate loading={null} persistor={persistore}>
            {(pageLoading && pageLoading && path === "/login") ||
            path === "/registration" ||
            path === "/" ? (
              <Component {...pageProps} />
            ) : (
              <FullLayout>
                <Component {...pageProps} />
              </FullLayout>
            )}
          </PersistGate>
        </GoogleOAuthProvider>
      </>
    );
 }
}

export default wrapper.withRedux(App);
