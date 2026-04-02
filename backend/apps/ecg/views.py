from rest_framework import viewsets
from .models import ECG
from .serializers import ECGSerializer
import sys
import os

# Adicionando o diretório backend ao sys.path caso não esteja para o import funcionar
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
from services.ecg_analyzer import analyze_ecg

class ECGViewSet(viewsets.ModelViewSet):
    queryset = ECG.objects.all()
    serializer_class = ECGSerializer

    def perform_create(self, serializer):
        user_id = self.request.data.get('frontend_user_id')
        user_instance = None
        
        # Se for uma sessão normal com autenticação do Django, use isso:
        if self.request.user and self.request.user.is_authenticated:
            user_instance = self.request.user
        elif user_id:
            # Alternativa: pegue do ID enviado pelo Next.js vindo do JWT NextAuth
            from django.contrib.auth import get_user_model
            User = get_user_model()
            try:
                user_instance = User.objects.get(id=user_id)
            except (User.DoesNotExist, ValueError):
                pass
                
        if user_instance:
            instance = serializer.save(user=user_instance)
        else:
            instance = serializer.save()
            
        if instance.file:
            try:
                # Passa o caminho físico do arquivo para o script
                result = analyze_ecg(instance.file.path)
                instance.result = result
                instance.save()
            except Exception as e:
                print(f"Error during ECG analysis: {e}")
                instance.result = "Erro ao analisar o ECG."
                instance.save()
