from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from app.websocket.connection_manager import manager

router = APIRouter()


@router.websocket("/ws/dashboard")
async def websocket_dashboard(
    websocket: WebSocket
):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            print("Received:", data)

    except WebSocketDisconnect:
        manager.disconnect(websocket)

from app.websocket.connection_manager import manager


@router.get("/test-broadcast")
async def test_broadcast():

    await manager.broadcast({
        "type": "test",
        "message": "WebSocket working!"
    })

    return {
        "message": "sent"
    }