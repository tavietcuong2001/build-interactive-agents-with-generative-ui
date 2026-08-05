
import { z } from "zod";

export const demonstrationCatalogDefinitions = {
  Title: {
    description: "Tiêu đề. Dùng cho tiêu đề phần và tiêu đề trang.",
    props: z.object({
      text: z.string(),
      level: z.string().optional(),
    }),
  },

  Text: {
    description: "Thẻ văn bản. Dùng cho các nhãn, giá trị, chú thích.",
    props: z.object({
      text: z.union([z.string(), z.object({ path: z.string() })]),
      variant: z.enum(["h1", "h2", "h3", "body", "caption"]).optional(),
    }),
  },

  Icon: {
    description: "Biểu tượng Material icon theo tên.",
    props: z.object({
      name: z.string(),
      size: z.number().optional(),
    }),
  },

  Image: {
    description: "Thẻ hình ảnh.",
    props: z.object({
      src: z.union([z.string(), z.object({ path: z.string() })]),
      alt: z.union([z.string(), z.object({ path: z.string() })]).optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    }),
  },

  Divider: {
    description: "Đường phân cách ngang.",
    props: z.object({}),
  },

  Card: {
    description: "Thẻ chứa chung với một vị trí dành cho component con.",
    props: z.object({
      child: z.string().optional(),
    }),
  },

  List: {
    description: "Danh sách các component con. Hỗ trợ hướng ngang hoặc dọc.",
    props: z.object({
      children: z.union([
        z.array(z.string()),
        z.object({ componentId: z.string(), path: z.string() }),
      ]),
      direction: z.enum(["horizontal", "vertical"]).optional(),
      gap: z.number().optional(),
    }),
  },

  Tabs: {
    description: "Thẻ chứa dạng tab. Mỗi tab có một nhãn và nội dung con.",
    props: z.object({
      tabs: z.array(z.object({ label: z.string(), child: z.string() })),
    }),
  },

  Row: {
    description: "Thẻ chứa bố cục theo chiều ngang.",
    props: z.object({
      gap: z.number().optional(),
      align: z.string().optional(),
      justify: z.string().optional(),
      children: z.union([
        z.array(z.string()),
        z.object({ componentId: z.string(), path: z.string() }),
      ]),
    }),
  },

  Column: {
    description: "Thẻ chứa bố cục theo chiều dọc.",
    props: z.object({
      gap: z.number().optional(),
      align: z.string().optional(),
      children: z.union([
        z.array(z.string()),
        z.object({ componentId: z.string(), path: z.string() }),
      ]),
    }),
  },

  DashboardCard: {
    description:
      "Thẻ bảng điều khiển có tiêu đề và phụ đề tùy chọn. Có một slot 'child' chứa nội dung (biểu đồ, chỉ số, v.v.). Sử dụng 'child' với ID của một component duy nhất.",
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      child: z.string().optional(),
    }),
  },

  Metric: {
    description:
      "Hiển thị chỉ số quan trọng gồm nhãn, giá trị và chỉ số xu hướng tùy chọn. Rất thích hợp cho KPI và số liệu thống kê.",
    props: z.object({
      label: z.string(),
      value: z.string(),
      trend: z.enum(["up", "down", "neutral"]).optional(),
      trendValue: z.string().optional(),
    }),
  },

  PieChart: {
    description:
      "Biểu đồ hình tròn/donut. Cung cấp dữ liệu dưới dạng mảng các đối tượng {label, value, color}.",
    props: z.object({
      data: z.array(
        z.object({
          label: z.string(),
          value: z.number(),
          color: z.string().optional(),
        }),
      ),
      innerRadius: z.number().optional(),
    }),
  },

  BarChart: {
    description:
      "Biểu đồ cột. Cung cấp dữ liệu dưới dạng mảng các đối tượng {label, value}.",
    props: z.object({
      data: z.array(z.object({ label: z.string(), value: z.number() })),
      color: z.string().optional(),
    }),
  },

  Badge: {
    description:
      "Huy hiệu/thẻ trạng thái nhỏ. Dùng cho nhãn, trạng thái, danh mục.",
    props: z.object({
      text: z.string(),
      variant: z
        .enum(["success", "warning", "error", "info", "neutral"])
        .optional(),
    }),
  },

  DataTable: {
    description: "Bảng dữ liệu gồm các cột và dòng.",
    props: z.object({
      columns: z.array(z.object({ key: z.string(), label: z.string() })),
      rows: z.array(z.record(z.any())),
    }),
  },

  Button: {
    description:
      "Nút tương tác. Sử dụng 'label' cho văn bản đơn giản hoặc 'child' cho component con. 'action' sẽ được gửi đi khi nhấp vào.",
    props: z.object({
      label: z.string().optional(),
      child: z
        .string()
        .describe(
          "ID của component con (ví dụ: một Text component làm nhãn).",
        )
        .optional(),
      variant: z.enum(["primary", "secondary", "ghost"]).optional(),
      action: z
        .union([
          z.object({
            event: z.object({
              name: z.string(),
              context: z.record(z.any()).optional(),
            }),
          }),
          z.null(),
        ])
        .optional(),
    }),
  },
};

/** Hỗ trợ kiểu dữ liệu (type helper) cho các renderer */
export type DemonstrationCatalogDefinitions = typeof demonstrationCatalogDefinitions;
