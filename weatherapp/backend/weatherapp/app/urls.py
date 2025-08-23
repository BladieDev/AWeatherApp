from django.urls import path
from .views import sendLocation
from . import views

urlpatterns = [
    path('sendLocation/', views.sendLocation, name='sendLocation'),
]
