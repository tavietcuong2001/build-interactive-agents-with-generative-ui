from __future__ import annotations

import csv
import warnings
from pathlib import Path
from typing import Any

warnings.filterwarnings("ignore")

from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from copilotkit import CopilotKitMiddleware, LangGraphAGUIAgent
from fastapi import FastAPI
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.memory import MemorySaver

_LESSON_ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = _LESSON_ROOT / "db.csv"


@tool
def query_data(query: str) -> list[dict[str, Any]]:
    """Truy vấn tập dữ liệu bài học. Luôn gọi hàm này trước khi hiển thị biểu đồ hoặc đồ thị."""
    with CSV_PATH.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)


def _build_graph():
    return create_agent(
        model=ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite"),
        tools=[query_data],
        middleware=[CopilotKitMiddleware()],
        checkpointer=MemorySaver(),
        system_prompt=(
            "Bạn là một trợ lý hữu ích cho một ứng dụng demo có sẵn một vài công cụ giao diện. "
            "Khi người dùng yêu cầu vẽ biểu đồ dựa trên tập dữ liệu bài học, hãy luôn gọi query_data trước để lấy toàn bộ các dòng từ tệp CSV. "
            "Ưu tiên sử dụng công cụ phía giao diện phù hợp nếu nó giúp trình bày câu trả lời một cách rõ ràng. "
            "Sử dụng pieChart cho phân bố theo danh mục và flightCard cho tóm tắt thông tin một chuyến bay đơn lẻ khi phù hợp. "
            "Các đối số truyền vào công cụ phải khớp chính xác với schema đã được cung cấp."
        ),
    )


def start_backend(port: int = 8003) -> None:
    from helper import start_server

    app = FastAPI()
    agent = LangGraphAGUIAgent(
        name="demo_agent",
        description="Demo agent",
        graph=_build_graph(),
    )
    add_langgraph_fastapi_endpoint(app=app, agent=agent, path="/")
    start_server(app, port=port)
