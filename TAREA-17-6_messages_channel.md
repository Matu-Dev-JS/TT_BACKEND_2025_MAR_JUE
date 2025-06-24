## MessagesChannel

ACLARACION:
Es recomendable que hagan un middleware que se llame channelMiddleware que checkee:
- Que el channel exista

Que guarde el canal buscado en request.channel



GET `/api/messages/:workspace_id/:channel_id/`

Obtiene todos los mensajes pertenecientes al channel consultado.

Ejemplo de respuesta:
```json
{
    "message": "Mensajes obtenidos",
    "ok": true,
    "status": 200,
    "data": {
        "messages": [
            {
                
            }
            // Aquí vendrá la lista de mensajes
        ]
    }
}
```
---------------------------------------------------------------------------------------------------------

POST `/api/messages/:channel_id/`

Envia un nuevo mensaje al channel consultado.

Ejemplo de body:
```json
{
    "message": "Mensaje de prueba"
}
```

Ejemplo de respuesta:
```json
{
    "message": "Mensajes obtenidos",
    "ok": true,
    "status": 200,
    "data": {
        "messages": [
            // Aquí vendrá la lista de mensajes
        ]
    }
}
```