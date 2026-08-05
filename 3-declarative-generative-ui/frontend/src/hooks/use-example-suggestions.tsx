import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export const useExampleDynamicSuggestions = () => {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Bảng điều khiển doanh số",
        message:
          "Hãy hiển thị cho tôi bảng điều khiển doanh số gồm tổng doanh thu, số khách hàng mới và tỷ lệ chuyển đổi. Bao gồm biểu đồ hình tròn phân bổ doanh thu theo danh mục và biểu đồ cột về doanh số hàng tháng.",
      },
    ],
    available: "always",
  });
};


export const useExampleFixedSuggestions = () => {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Tìm chuyến bay",
        message:
          "Tìm các chuyến bay từ San Francisco (SFO) đến New York (JFK) vào thứ 6 tuần tới. Hiển thị các lựa chọn từ nhiều hãng hàng không khác nhau.",
      },
    ],
    available: "always",
  });
};
