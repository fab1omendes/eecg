from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok"})

@api_view(['POST'])
def signup(request):    
    return Response({"status": "ok"})

@api_view(['POST'])
def check_email(request):
    return Response({"status": "ok"})

@api_view(['POST'])
def create_user_google(request):
    return Response({"status": "ok"})

@api_view(['POST'])
def login(request):
    return Response({"status": "ok"})

@api_view(['POST'])
def ecg_view(request):
    return Response({"status": "ok"})
