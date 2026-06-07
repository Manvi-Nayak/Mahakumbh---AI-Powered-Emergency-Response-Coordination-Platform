from app.websocket.connection_manager import manager


async def broadcast_incident_created(
    incident_id: int,
    title: str
):
    # print("Broadcasting incident")
    await manager.broadcast(
        {
            "type": "incident_created",
            "incident_id": incident_id,
            "title": title
        }
    )


async def broadcast_dispatch_created(
    dispatch_id: int,
    resource_id: int
):
    await manager.broadcast(
        {
            "type": "dispatch_created",
            "dispatch_id": dispatch_id,
            "resource_id": resource_id
        }
    )


async def broadcast_dispatch_updated(
    dispatch_id: int,
    status: str
):
    await manager.broadcast(
        {
            "type": "dispatch_updated",
            "dispatch_id": dispatch_id,
            "status": status
        }
    )