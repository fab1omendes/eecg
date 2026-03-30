from rest_framework import serializers
from .models import ECG

class ECGSerializer(serializers.ModelSerializer):
    class Meta:
        model = ECG
        fields = '__all__'