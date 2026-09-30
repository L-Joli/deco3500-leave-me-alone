import { FeelioProvider } from "./context/FeelioProvider";
import { useFeelio } from "./hooks/useFeelio";
import { useRoute } from "./hooks/useRoute";
import { LoadingPage } from "./pages/LoadingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DirectionPage } from "./pages/DirectionPage";
import { FacePage } from "./pages/FacePage";
import { HeadPage } from "./pages/HeadPage";
import { BellyPage } from "./pages/BellyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { OverviewPage } from "./pages/OverviewPage";

function RoutedApp() {
  const route = useRoute();
  const { state, connectionStatus } = useFeelio();

  if (route.kind === "not-found") {
    return <NotFoundPage pathname={route.pathname} />;
  }

  if (!state) {
    return <LoadingPage status={connectionStatus} />;
  }

  if (route.kind === "partner") {
    switch (route.screen) {
      case "face":
        return <FacePage partnerId={route.partnerId} />;
      case "head":
        return <HeadPage partnerId={route.partnerId} />;
      case "left":
        return (
          <DirectionPage partnerId={route.partnerId} direction="previous" />
        );
      case "right":
        return <DirectionPage partnerId={route.partnerId} direction="next" />;
      case "belly":
        return <BellyPage partnerId={route.partnerId} />;
      case "overview":
        return <OverviewPage partnerId={route.partnerId} />;
      default:
        break;
    }
  }

  return <DashboardPage />;
}

export function App() {
  return (
    <FeelioProvider>
      <RoutedApp />
    </FeelioProvider>
  );
}
