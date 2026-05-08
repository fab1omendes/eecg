from rest_framework import viewsets
from .models import ECG, CardioFluxAnalysis
from .serializers import ECGSerializer, CardioFluxAnalysisSerializer

import sys
import os

# Adicionando o diretório backend ao sys.path caso não esteja para o import funcionar
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
from services.ecg_analyzer import analyze_ecg

class ECGViewSet(viewsets.ModelViewSet):
    queryset = ECG.objects.all()
    serializer_class = ECGSerializer

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated:
            return ECG.objects.filter(user=user)
        
        # Fallback para Next.js que envia o ID do usuário via query param
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return ECG.objects.filter(user_id=user_id)
            
        return ECG.objects.none()



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

class CardioFluxViewSet(viewsets.ModelViewSet):
    queryset = CardioFluxAnalysis.objects.all()
    serializer_class = CardioFluxAnalysisSerializer

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated:
            return CardioFluxAnalysis.objects.filter(user=user)
            
        # Fallback para Next.js que envia o ID do usuário via query param
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return CardioFluxAnalysis.objects.filter(user_id=user_id)

        return CardioFluxAnalysis.objects.none()


    def perform_create(self, serializer):
        user_id = self.request.data.get('frontend_user_id')
        user_instance = None
        
        if self.request.user and self.request.user.is_authenticated:
            user_instance = self.request.user
        elif user_id:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            try:
                user_instance = User.objects.get(id=user_id)
            except (User.DoesNotExist, ValueError):
                pass
                
        if user_instance:
            serializer.save(user=user_instance)
        else:
            serializer.save()

