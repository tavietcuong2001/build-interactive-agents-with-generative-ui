import { z } from "zod"
import { CopilotChat } from "@copilotkit/react-core/v2";
import { useComponent } from "@copilotkit/react-core/v2";

import { FlightCard, FlightCardProps } from "@/components/flight-card";
import { PieChart, PieChartProps } from "@/components/pie-chart";

import { useExampleSuggestions } from "@/hooks/use-example-suggestions";

export default function App() {

  // Đăng ký component 1: Hiển thị tên người dùng
  useComponent({
    name: "showMyName",
    description: "Hiển thị tên của người dùng trong một thẻ",
    parameters: z.object({ name: z.string() }),
    render: ({ name }) => <div className="bg-blue-500 p-4">Hi, {name}!</div>,
  });

  // Đăng ký component 2: Biểu đồ tròn hiển thị dữ liệu cấu trúc
  useComponent({
    name: "pieChart",
    description: "Giao diện hiển thị dữ liệu dưới dạng biểu đồ tròn.",
    parameters: PieChartProps,
    render: PieChart,
  });

  // Đăng ký component 3: Thẻ thông tin chuyến bay
  useComponent({
    name: "flightCard",
    description: "Giao diện hiển thị tóm tắt thông tin của một chuyến bay.",
    parameters: FlightCardProps,
    render: FlightCard,
  });

  // Thêm các nút gợi ý câu hỏi vào CopilotChat
  useExampleSuggestions();

  return <CopilotChat />;

};
