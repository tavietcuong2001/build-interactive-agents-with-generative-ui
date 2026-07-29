
import { CopilotChat } from "@copilotkit/react-core/v2";

export const agentId = "gemini"; // Chuyển từ "default" sang "gemini"

export default function App() {
  return <CopilotChat agentId={agentId} />;
}
