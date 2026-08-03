
import { CopilotChat } from "@copilotkit/react-core/v2";

export const agentId = "gemini"; // Chuyển sang dùng Gemini

export default function App() {
  return <CopilotChat agentId={agentId} />;
}
