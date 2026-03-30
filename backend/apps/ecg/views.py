from rest_framework import viewsets
from .models import ECG
from .serializers import ECGSerializer

class ECGViewSet(viewsets.ModelViewSet):
    queryset = ECG.objects.all()
    serializer_class = ECGSerializer