import "../styles/globals.scss";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { createStore } from "redux";
import AOS from "aos";
import rootReducer from "../redux/reducers/rootReducer";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const querySiteID = "jigar-web";
  const router = useRouter();
  const { site_id } = router.query;

  useEffect(() => {
    if (!site_id) {
      router.push(`/${querySiteID}`);
    }

    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });

    // eslint-disable-next-line
  }, []);

  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
