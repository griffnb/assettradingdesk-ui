import { useEffect } from "react";

interface Props {
  tasks: (() => Promise<void>)[];
  onFinish?: () => void;
  dependencies: React.DependencyList;
}
export function useParallelEffect(props: Props) {
  useEffect(() => {
    const runTasks = async () => {
      try {
        await Promise.all(props.tasks.map((task) => task()));
        if (props.onFinish) {
          props.onFinish();
        }
      } catch (err) {
        console.error("Error in useParallel:", err);
      }
    };

    if (props.tasks.length > 0) {
      runTasks();
    }
  }, props.dependencies);
}
