from rest_framework import serializers
from .models import ECG, CardioFluxAnalysis


class ECGSerializer(serializers.ModelSerializer):
    class Meta:
        model = ECG
        fields = '__all__'

class CardioFluxAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioFluxAnalysis
        fields = '__all__'