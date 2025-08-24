from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests


@api_view(['POST'])
def sendLocation(request):
    longitude = request.data.get("longitude")
    latitude = request.data.get("latitude")

    if not longitude or not latitude:
        return Response({"error": "Brak współrzędnych"}, status=400)

    key = "pk.c3b35e845955f76e78d22b93e94e8d52"
    url = f"https://us1.locationiq.com/v1/reverse?key={key}&lat={latitude}&lon={longitude}&format=json&"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)

    try:
        data = response.json()
    except Exception:
        return Response({"error": "Błąd pobierania", "details": response.text}, status=500)

    return Response(data)

# Create your views here.
