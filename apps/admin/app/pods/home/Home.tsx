import { AnalyticsDashboardShowcase } from "@/ui/examples/screens/AnalyticsDashboardShowcase";
import { PipelineBoardShowcase } from "@/ui/examples/screens/PipelineBoardShowcase";
import { observer } from "mobx-react-lite";

export const Home = observer(function Home() {
  return (
    <>
      <AnalyticsDashboardShowcase />
      <PipelineBoardShowcase />
    </>
  );
});
