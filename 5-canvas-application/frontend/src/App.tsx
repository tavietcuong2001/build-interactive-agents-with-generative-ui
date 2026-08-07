import { z } from "zod"
import { CopilotChat, useAgent, useFrontendTool } from "@copilotkit/react-core/v2";
import { useState } from "react";
import { TodoAppLayout } from "@/components/todo-app-layout";
import { TodoList } from "@/components/todo-list";
import { useExampleSuggestions} from "@/hooks/use-example-suggestions";


export default function App() {
  useExampleSuggestions();

  const [todosOpen, setTodosOpen] = useState(false);

  // 🪁 Đăng ký frontend tool để AI agent có thể gọi và điều khiển UI
  useFrontendTool({
    name: "openOrCloseTodos",
    description: "Mở hoặc đóng panel chứa danh sách todo.",
    parameters: z.object({ open: z.boolean()}),
    handler: async ({open}) => {
      setTodosOpen(open);
      return `Panel todos đã được ${ open ? 'mở' : 'đóng'}.`;
    },
  });

  // 🪁 Đăng ký theo dõi trạng thái chung của agent
  const { agent } = useAgent();

  return (
    <TodoAppLayout
      chat={<CopilotChat />}
      open={todosOpen}
      onOpenChange={setTodosOpen}
      panel={(onClose) => (
        <TodoList
          // 🪁 Đọc trạng thái chia sẻ từ backend
          todos={agent.state.todos || []} 

          // 🪁 Ghi/Cập nhật trạng thái chia sẻ từ frontend
          onUpdate={(updated) => agent.setState({ todos: updated })}

          isRunning={agent.isRunning}
          onClose={onClose}
        />
      )}
    />
  );
}
