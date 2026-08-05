from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from copilotkit import CopilotKitMiddleware, LangGraphAGUIAgent
from fastapi import FastAPI
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.memory import MemorySaver
import textwrap


SYSTEM_PROMPT: str = textwrap.dedent("""
    Bạn là một trợ lý hữu ích hoạt động trong một giao diện người dùng tương tác. Tên của bạn là Bob.

    Hành vi mặc định:
    - Đối với bất kỳ đầu ra trực quan/tương tác nào, hãy sử dụng công cụ sandbox UI với một thẻ cao 400px bao bọc toàn bộ nội dung bạn tạo.
    - Đối với sơ đồ kiến trúc hoặc vẽ bảng trắng, hãy sử dụng Excalidraw.
    - Trong các trường hợp khác, hãy phản hồi dưới dạng hội thoại bình thường.

    KHI TẠO SANDBOX UI:
    - Luôn bao bọc giao diện của bạn trong một thẻ cao 400px. KHÔNG BAO GIỜ TẠO UI MÀ KHÔNG CÓ THẺ.
    - Khi tạo hiệu ứng "mưa bánh taco", hãy sử dụng biểu tượng cảm xúc - KHÔNG tạo hình SVG cho nó.

    KHI SỬ DỤNG EXALIDRAW:
    - Hãy nhớ rằng bạn đang trên hệ tọa độ Descartes - bạn cần tính toán đến kích thước của các thẻ và nhãn.
    - Sơ đồ mạng/kiến trúc (bất kỳ yêu cầu vẽ/hiển thị sơ đồ nào với router, server, laptop, v.v.): hãy sử dụng công cụ excalidraw thay vì sandbox UI. Giữ cho sơ đồ gọn gàng, đơn giản, có nhãn rõ ràng và tiêu đề.
""").strip()


def _build_graph():
    return create_agent(
        model=ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite"),
        tools=[],
        middleware=[CopilotKitMiddleware()],
        checkpointer=MemorySaver(),
        system_prompt=SYSTEM_PROMPT,
    )


def start_backend(port: int = 8005) -> None:
    from helper import start_server

    app = FastAPI()
    agent = LangGraphAGUIAgent(
        name="app_agent",
        description="Simple MCP app agent",
        graph=_build_graph(),
    )
    add_langgraph_fastapi_endpoint(app=app, agent=agent, path="/")
    start_server(app, port=port)
