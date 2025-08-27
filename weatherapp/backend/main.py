from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Coords(BaseModel):
    latitude: float
    longitude: float


@app.post("/sendLocation")
def location(coords: Coords):
    latitude = coords.latitude
    longitude = coords.longitude

    key = "API_KEY"
    url = f"https://us1.locationiq.com/v1/reverse?key={key}&lat={latitude}&lon={longitude}&format=json&"

    response = requests.get(url)
    data = response.json()
    return data
