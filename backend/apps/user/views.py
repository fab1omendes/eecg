from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import update_last_login

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def check_email(self, request):
        email = request.query_params.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'exists': True})
        return Response({'exists': False})     
    
    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def auth(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):

            update_last_login(None, user)

            # Se deu Acerto, retorne os dados dele com Status 200 (o NextAuth precisa disso)
            return Response({
                'id': str(user.id), # convertendo para string para gerar o JWT de segurança
                'email': user.email,
                'name': user.first_name,
            }, status=status.HTTP_200_OK)

        # Se deu Falha, solte Explicitamente um Status 401 Não Autorizado!
        return Response({'detail': 'Senha ou email incorretos.'},
status=status.HTTP_401_UNAUTHORIZED)