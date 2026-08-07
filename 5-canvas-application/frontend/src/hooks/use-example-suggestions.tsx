import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export const useExampleSuggestions = () => {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Thêm việc cần làm",
        message: "Thêm ba việc cần làm về việc học CopilotKit",
      },
      {
        title: "Kiểm tra danh sách",
        message: "Danh sách việc cần làm của tôi hiện tại có những gì?",
      },
      {
        title: "Tổng kết công việc",
        message: "Đánh dấu tất cả việc cần làm là đã hoàn thành và tóm tắt lại những gì chúng ta đã làm.",
      },
    ],
    available: "always",
  });
};
