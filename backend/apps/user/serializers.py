from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

          # Isso garante que a senha nunca retorne no JSON de resposta, apenas no envio (POST)
        extra_kwargs = {
            'password': {'write_only': True}}

    def create(self, validated_data):
        # Remove a senha do dicionário antes de criar o usuário
        password = validated_data.pop('password', None)

        # Cria o usuário passando o resto dos dados
        user = super().create(validated_data)

        #Faz a hash/criptografia da senha usando PBKDF2 o padrão do Django e salva
        if password:
            user.set_password(password)
            user.save()

        return user