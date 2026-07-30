import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export const useExampleSuggestions = () => {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Hiển thị tên tôi",
        message:
          "Hiển thị tên của tôi trong đoạn chat.",
      },
      {
        title: "Biểu đồ hình tròn",
        message:
          "Hiển thị cơ cấu doanh thu theo danh mục bằng biểu đồ tròn.",
      },
      {
        title: "Thẻ chuyến bay",
        message:
          "Hiển thị thông tin chuyến bay của hãng Pacific Air từ SFO đến JFK cất cánh lúc 08:30 với giá $249.",
      },
    ],
    available: "always",
  });
};
