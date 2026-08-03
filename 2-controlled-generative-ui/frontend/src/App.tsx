
import { z } from "zod"
import { CopilotChat } from "@copilotkit/react-core/v2";
import { useComponent } from "@copilotkit/react-core/v2";

import { FlightCard, FlightCardProps } from "@/components/flight-card";
import { PieChart, PieChartProps } from "@/components/pie-chart";

import { useExampleSuggestions } from "@/hooks/use-example-suggestions";

export default function App() {

  // 🪁 Đăng ký component hiển thị tên người dùng
  useComponent({
    name: "showMyName",
    description: "Hiển thị tên của người dùng trong một thẻ.",
    parameters: z.object({ name: z.string() }),
    render: ({ name }) => <div className="bg-blue-500 p-4">Hi, {name}!</div>,
  });

  // 🪁 Đăng ký component pieChart để hiển thị dữ liệu cấu trúc
  useComponent({
    name: "pieChart",
    description: "Hiển thị dữ liệu dưới dạng biểu đồ hình tròn.",
    parameters: PieChartProps,
    render: PieChart,
  });

  // 🪁 Đăng ký component flightCard để hiển thị dữ liệu chuyến bay
  useComponent({
    name: "flightCard",
    description: "Hiển thị thẻ tóm tắt thông tin một chuyến bay.",
    parameters: FlightCardProps,
    render: FlightCard,
  });

  // 🪁 Thêm các gợi ý prompt cho người dùng hiển thị dưới dạng nút bấm
  useExampleSuggestions();

  return <CopilotChat />;

};
